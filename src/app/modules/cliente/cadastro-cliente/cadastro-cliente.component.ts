import { AlertService } from './../../../core/services/alert.service';
import { GenericValidator } from './../../../shared/utils/validators/generic-validator';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/core/models/cliente.model';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent implements OnInit {


  form!: FormGroup
  cliente!: Cliente;



  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, GenericValidator.nomeClienteValidator()]],
      cpf: [null, [Validators.required, Validators.pattern(/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/), GenericValidator.cpfValidator()]],
      email: ['', Validators.required],
      dtNascimento: [null, [Validators.required, GenericValidator.idadeClienteValidator()]],
      dtCadastro: [null, Validators.required],
      renda: [null, Validators.required]
    })
  }

  addCliente() {
    const cliente: Cliente = {
      nome: this.form.get('nome')?.value,
      cpf: this.form.get('cpf')?.value,
      dataNascimento: this.form.get('dtNascimento')?.value,
      email: this.form.get('email')?.value,
      dataCadastro: this.form.get('dtCadastro')?.value,
      renda: this.form.get('renda')?.value,
    }

    if (this.form.get('dtNascimento')?.invalid) {
      this.alertService.notify('warning', 'Cliente deve possuir mais de 18 anos e menos de 60.');
      return;
    }

    if (this.form.get('nome')?.invalid) {
      this.alertService.notify('warning', 'Cliente deve inserir ao menos um sobrenome.');
      return;
    }

    if (this.form.value === '' || this.form.value === null) {
      this.alertService.notify('warning', 'Não foi possível cadastrar cliente, preencha todos os campos');
    } else {
      this.clienteService.setCliente(cliente).subscribe((res: any) => {
        this.alertService.notify('success', 'Cliente cadastrado com sucesso');
        this.clearForm();
      },
        (error: Error) => {
          console.log('Erro ao adicionar cliente: ', error);
        })
    }


  }

  clearForm() {
    this.form.reset();
  }



}
