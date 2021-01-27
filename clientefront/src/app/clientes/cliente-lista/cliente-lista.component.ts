import { Component, OnInit } from '@angular/core';
import { Cliente, ClientesService } from '../clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  cliente : Cliente = new Cliente();
  lista : Cliente[] = [];

  constructor(private clientesService : ClientesService,
              private router : Router) { }

  ngOnInit(): void {
    this.clientesService.getClientes().then((data)=>{
      this.lista = data;
    })
  }

  excluir(cli : Cliente){
    this.clientesService.excluir(cli)
    .then(()=>{
      this.router.navigate(['lista-cliente']);
    })
  }

}
