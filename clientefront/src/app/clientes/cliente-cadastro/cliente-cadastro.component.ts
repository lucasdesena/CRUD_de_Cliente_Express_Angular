import { Component, OnInit } from '@angular/core';
import { Cliente, ClientesService } from '../clientes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {

  cliente : Cliente = new Cliente();
  existe : boolean = false;
  lista : Array<any> = [];

  constructor(private clientesService : ClientesService,
              private route : ActivatedRoute,
              private router : Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.clientesService.getCliente( parseInt(id) )
      .then((cli)=>{
        this.cliente = cli;
      })
      this.existe = true;
    }
  }

  salvar(){
    this.clientesService.salvar(this.cliente)
    .then((cli)=>{
      this.router.navigate(['lista-cliente']);
    }).catch((erro)=>{
      console.log(erro);
      this.lista = erro.error;
    })
  }

}
