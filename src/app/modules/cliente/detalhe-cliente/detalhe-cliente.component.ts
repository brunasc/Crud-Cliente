import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/core/models/cliente.model';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { GenericValidator } from 'src/app/shared/utils/validators/generic-validator';

@Component({
  selector: 'app-detalhe-cliente',
  templateUrl: './detalhe-cliente.component.html',
  styleUrls: ['./detalhe-cliente.component.scss']
})
export class DetalheClienteComponent implements OnInit {

  cliente: Cliente = {
    nome: '',
    cpf: '',
    email: '',
    dataNascimento: '',
    dataCadastro: '',
    renda: 0
  };
  form!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.getParams();
    this.createForm();
  }

  getParams() {
    this.activatedRoute.params.subscribe(params => {
      const clienteID = params['id'];
      this.clienteService.getClientePorId(clienteID).subscribe(cliente => {
        this.cliente = cliente;
        this.createForm();
      });
    });
  }

  createForm() {
    this.form = this.fb.group({
      nome: [this.cliente.nome, [Validators.required, GenericValidator.nomeClienteValidator()]],
      cpf: [{ value: this.cliente.cpf, disabled: true },, [Validators.required, Validators.pattern(/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/), GenericValidator.cpfValidator()]],
      email: [this.cliente.email, Validators.required],
      dtNascimento: [this.cliente.dataNascimento, [Validators.required, GenericValidator.idadeClienteValidator()]],
      dtCadastro: [this.cliente.dataCadastro, Validators.required],
      renda: [this.cliente.renda, Validators.required]
    });
  }

  salvar() {
    if (this.form.valid) {
      // Atualizar os dados do cliente com base nos campos do formulário
      this.cliente.nome = this.form.get('nome')?.value;
      this.cliente.email = this.form.get('email')?.value;
      this.cliente.dataNascimento = this.form.get('dtNascimento')?.value;
      this.cliente.dataCadastro = this.form.get('dtCadastro')?.value;
      this.cliente.renda = this.form.get('renda')?.value;

      // Chamar o serviço para atualizar o cliente
      this.clienteService.updateCliente(this.cliente).subscribe(() => {
        // Redirecionar para a página de detalhes do cliente
        this.router.navigate(['/cliente/lista', this.cliente.id]);
      });
    }
  }
}
