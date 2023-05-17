import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { DetalheClienteComponent } from './detalhe-cliente/detalhe-cliente.component'
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';

import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxCurrencyModule } from "ngx-currency";
import { customCurrencyMaskConfig } from 'src/app/core/config/mask-currency.config';



const maskConfig: Partial<IConfig> = {
  validation: true,
}

@NgModule({
  declarations: [
    CadastroClienteComponent,
    ListaClientesComponent,
    DetalheClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClienteModule { }
