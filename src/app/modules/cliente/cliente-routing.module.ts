import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { DetalheClienteComponent } from './detalhe-cliente/detalhe-cliente.component';

const routes: Routes = [
  { path: 'cadastro', component: CadastroClienteComponent },
  { path: 'lista', component: ListaClientesComponent },
  { path: 'detalhes/:id', component: DetalheClienteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
