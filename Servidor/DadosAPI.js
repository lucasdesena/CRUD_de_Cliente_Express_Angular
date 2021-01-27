const fs = require('fs');
const util = require('util');
const NOME_ARQUIVO = 'clientes.json';

function Cliente(){
    this.id = 0,
    this.nome = '',
    this.sobrenome = '',
    this.senha = '',
    this.email = '',
    this.sexo = '',
    this.cpf = '',
    this.rg = '',
    this.telefone = '',
    this.data_de_nascimento = '',
    this.estado_civil = '',
    this.cep = '',
    this.endereco = ''
}

var lista = [];

async function GetListaClientes(){
    await CarregarArquivo();
    return lista;
}

async function AddClientes(cliente){
    await CarregarArquivo();
    let existe = false;
    for (let i = 0; i < lista.length; i++) {
        if ( lista[i].id == cliente.id){
            lista[i] = cliente;
            existe = true;
            break;
        }        
    }
    if (!existe)
        lista.push(cliente);
    await SalvarArquivo();
}

async function SalvarArquivo(){
    let data = JSON.stringify(lista);
    await util.promisify(fs.writeFile)(NOME_ARQUIVO,data)
}

async function CarregarArquivo(){
    try {
        let stat = await util.promisify(fs.stat)(NOME_ARQUIVO);
        if(stat.isFile){
            let data = await util.promisify(fs.readFile)(NOME_ARQUIVO);
            lista = JSON.parse(data.toString());
        }
    } catch (error) {}
}

async function CarregaClientePorCodigo(id){
    await CarregarArquivo();
    for (let i = 0; i < lista.length; i++) {
        if ( lista[i].id == id){
            return lista[i];
        }        
    }
    return new Cliente();
}

async function DeletaClientePorCodigo(id){
    for (let i = 0; i < lista.length; i++) {
        if ( lista[i].id == id){
            lista.splice(i,1);
            await SalvarArquivo();
            break;
        }        
    }
}

async function ValidarIdEscolhido(id){
    var list = await GetListaClientes();
    for (let i = 0; i < list.length; i++) {
        if ( list[i].id == id){
            return true;
        }        
    }
    return false;
}

//Manipulação da Data de nascimento

//Tranforma a data do formato yyyy-MM-dd para o formato dd/MM/yyyy
function CorrigirData(data) {

    if (data === '') {

        return '';

    }else{
        let separarData = data.split('-');
        let dataCorrigida = separarData[2]+"/"+separarData[1]+"/"+separarData[0];
        return dataCorrigida;
    }
}

//Faz a validação da data atual
function dataAtual() {

    var hoje = new Date();
    var dd = hoje.getDate();
    var mm = hoje.getMonth()+1; //Janeiro é 0!
    var yyyy = hoje.getFullYear();
     if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 

    hoje = dd+'/'+mm+'/'+yyyy;
    return hoje;
}

//Tranforma a data do formato dd/MM/yyyy para o formato yyyy-MM-dd
function formatarData(data) {

    var separarData = data.split('/');
    var dataCorrigida = (separarData[2]+"-"+separarData[1]+"-"+separarData[0]);

    return dataCorrigida;
}

module.exports.Cliente = Cliente;
module.exports.GetListaClientes = GetListaClientes;
module.exports.AddClientes = AddClientes;
module.exports.CarregaClientePorCodigo = CarregaClientePorCodigo;
module.exports.DeletaClientePorCodigo = DeletaClientePorCodigo;
module.exports.ValidarIdEscolhido = ValidarIdEscolhido;
module.exports.CorrigirData = CorrigirData;
module.exports.dataAtual = dataAtual;
module.exports.formatarData = formatarData;