import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteCadastroComponent } from './clientes/cliente-cadastro/cliente-cadastro.component';
import { ClienteListaComponent } from './clientes/cliente-lista/cliente-lista.component';

const routes: Routes = [
  {path:'lista-cliente', component:ClienteListaComponent},
  {path:'cadastro-cliente', component:ClienteCadastroComponent},
  {path:'cadastro-cliente/:id', component:ClienteCadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
