const express = require('express');
const bodyParser = require("body-parser");
const dadosAPI = require('./DadosAPI');
const validator = require('express-validator');

const servidor = express();

const cors = require('cors');
servidor.use(cors());

servidor.use(bodyParser.json());    

// -- Metodos
servidor.get('/', (req,res) => {
    res.status(200).json('Serviço Funcionando!');
});

servidor.get('/clientes', async (req,res) => {
    let lista = await dadosAPI.GetListaClientes();
    res.json(lista);
});

servidor.get('/clientes/:id', async (req,res) => {
    let cli = await dadosAPI.CarregaClientePorCodigo(req.params.id);
    cli.data_de_nascimento = dadosAPI.formatarData(cli.data_de_nascimento);
    res.json(cli);
});

servidor.post('/clientes',[
    validator.check('id').trim().notEmpty().withMessage('é obrigatório').bail()
    .isInt().withMessage('precisa ser um número inteiro').bail()
    .custom((valor)=>{if(valor <= 0){throw new Error('precisa ser maior que 0');}return true}),
    validator.check(['nome', 'sobrenome', 'senha', 'email'], 'é obrigatório').trim().notEmpty(),
    validator.check('cep').optional({checkFalsy: true})
    .isLength({min: 9, max: 9}).withMessage('precisa ter 9 digitos').bail()
    .matches('[0-9]{5}-[0-9]{3}').withMessage('deve ser númerico, no formato: XXXXX-XXX'),
    validator.check('data_de_nascimento').optional({checkFalsy: true})
    .isDate().withMessage('precisa ser uma data válida').bail()
    .isAfter('1929-12-31').withMessage('precisa ser 01/01/1930 ou posterior')
    .isBefore(dadosAPI.formatarData(dadosAPI.dataAtual())).withMessage('precisa ser anterior a '+dadosAPI.dataAtual())
], async (req,res) => {

    var erros = [];
    erros = validator.validationResult(req).array();

    let cli = new dadosAPI.Cliente();

    cli.id = req.body.id;
    cli.nome = req.body.nome;
    cli.sobrenome = req.body.sobrenome;
    cli.senha = req.body.senha;
    cli.email = req.body.email;
    cli.sexo = req.body.sexo;
    cli.cpf = req.body.cpf;
    cli.rg = req.body.rg;
    cli.telefone = req.body.telefone;
    cli.data_de_nascimento = req.body.data_de_nascimento;
    cli.estado_civil = req.body.estado_civil;
    cli.cep = req.body.cep;
    cli.endereco = req.body.endereco;

    if (erros.length == 0){
        await dadosAPI.AddClientes(cli);
        res.json(cli);
    }
    else{
        res.status(400).json(erros);
    } 
});

servidor.delete('/clientes/:id', async (req,res) => {
    await dadosAPI.DeletaClientePorCodigo(req.params.id);
    res.end();
});

servidor.listen(3000,()=>{ console.log('Rodando Servidor Rest...'); })