import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component';
import { ClienteCadastroComponent } from './clientes/cliente-cadastro/cliente-cadastro.component';
import { ClientesService } from './clientes/clientes.service';

@NgModule({
  declarations: [
    AppComponent,
    ClienteListaComponent,
    ClienteCadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ClientesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
