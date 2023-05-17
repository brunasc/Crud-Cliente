import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Cliente } from 'src/app/core/models/cliente.model';
import { ClienteService } from 'src/app/core/services/cliente.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.scss']
})
export class ListaClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = []
  form!: FormGroup;
  nomeFiltro!: string;
  cpfFiltro!: string;
  nascimentoFiltro = new Date();
  currentPage = 1;
  totalPages = 0;
  sortBy: string ='';
  orderBy!: string;
  pageSize = 6; // Quantidade de itens por página
  endIndex = 0;
  pageNumbers: number[] = [];

  filterStateNome: boolean = false;

  hasNextPage: boolean = false;


  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listClientes();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: [null, Validators.required],
      dataNascimento: [new Date, Validators.required],
    });
  }

  listClientes(limit?: number, page?:number, sort?:string, order?:string) {
    if(sort || order ){
      this.orderBy = order as any;
      this.sortBy = sort as any;

    }

    this.clienteService.getClientes(limit, page, this.sortBy,this.orderBy).subscribe((res: any) => {
      this.clientes = res;
      this.clientesFiltrados = res;
      this.totalPages = this.getTotalPages();
      this.hasNextPage = this.clientesFiltrados.length > this.pageSize * this.currentPage;
    });
  }

  filtrarClientes() {
    this.clientesFiltrados = this.clientes.filter((cliente) => {
      let nomeValido = true;
      let cpfValido = true;
      let nascimentoValido = true;
      this.nomeFiltro = this.form.get('nome')?.value;
      this.cpfFiltro = this.form.get('cpf')?.value;
      this.nascimentoFiltro = this.form.get('dataNascimento')?.value;

      if (this.nomeFiltro) {
        nomeValido = cliente.nome.toLowerCase().includes(this.nomeFiltro.toLowerCase());
      }

      if (this.cpfFiltro) {
        cpfValido = cliente.cpf.includes(this.cpfFiltro);
      }

      if (this.nascimentoFiltro) {
        const filtroData = new Date(this.nascimentoFiltro);
        const clienteDataNascimento = new Date(cliente.dataNascimento);
        nascimentoValido = filtroData.getTime() === clienteDataNascimento.getTime();
      }

      return nomeValido && cpfValido && nascimentoValido;

    });
    this.atualizarClientesPaginados();
    this.totalPages = this.getTotalPages();
    this.gerarNumerosDePagina();
  }

  limparPesquisa() {
    this.nomeFiltro = '';
    this.cpfFiltro = '';
    this.nascimentoFiltro = new Date();
    this.clientesFiltrados = this.clientes;
    this.form.reset();

  }

  detalhesCliente(cliente: Cliente) {
    this.router.navigate(['/cliente/detalhes', cliente.id]);
  }

  removerCliente(cliente: Cliente) {
    if (confirm('Deseja realmente remover o cliente?')) {
      if (cliente) {
        this.clienteService.deleteCliente(cliente.id).subscribe(() => {
          this.clientes = this.clientes.filter(c => c.id !== cliente.id);
          this.clientesFiltrados = this.clientesFiltrados.filter(c => c.id !== cliente.id);
        }, (error) => {
          console.log(error);
        }
        );
      }

    }
  }


  atualizarClientesPaginados() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    let endIndex = startIndex + this.pageSize;
    if (endIndex >= this.clientes.length) {
      endIndex = this.clientes.length;
    }
    this.clientesFiltrados = this.clientes.slice(startIndex, endIndex);
    this.endIndex = endIndex;

    this.hasNextPage = endIndex < this.clientes.length;
  
  }

  getTotalPages() {
    return Math.ceil(this.clientesFiltrados.length / this.pageSize);
  }

  gerarNumerosDePagina() {
    this.pageNumbers = [];
    const totalPages = this.getTotalPages();

    for (let i = 1; i <= totalPages; i++) {
      this.pageNumbers.push(i);
    }
  }

  irParaPagina(page: number) {
    if (page >= 1 && page ) {
      this.listClientes(5, page);
      this.currentPage = page;
      // this.atualizarClientesPaginados();
    }
  }

  order(nome: string, type: string){
    this.listClientes(5, this.currentPage,nome,type);
  }
}
