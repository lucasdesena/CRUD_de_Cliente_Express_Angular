import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Cliente{
  id : number = 0;
  nome : string = '';
  sobrenome : string = '';
  senha : string = '';
  email : string = '';
  sexo : string = '';
  cpf : string = '';
  rg : string = '';
  telefone : string = '';
  data_de_nascimento : string = '';
  estado_civil : string = '';
  cep : string = '';
  endereco : string = '';
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http : HttpClient) { }

  async getClientes(){
    return await this.http.get<Cliente[]>('http://localhost:3000/clientes').toPromise();
  }

  async getCliente(id : number){
    return await this.http.get<Cliente>('http://localhost:3000/clientes/'+id).toPromise();
  }

  async salvar(cliente : Cliente){
    return await this.http.post<Cliente>('http://localhost:3000/clientes/',cliente).toPromise();
  }

  async excluir(cliente : Cliente){
    return await this.http.delete('http://localhost:3000/clientes/'+cliente.id).toPromise();
  }
}
