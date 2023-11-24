const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Product = require("../models/produto");
// registrando um usuaário
router.post("/register", async(req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const password = req.body.password;
    //checando se todos os dados foram enviados
    if (nome == null || email == null || password == null){
        return res.status(400).json({error : "Por favor, preencha todos os campos"});
    }

    //conferindo se o usuário já existe
    const emailExists = await User.findOne({email : email});
    if(emailExists){
        return res.status(400).json({error : "O e-mail informado já existe."})
    }
    //criando a senha com bcrypt
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    //criando o usuário após as validações no sistema
    const user = new User({
        nome : nome,
        email : email,
        password: passwordHash
    });
    //montando um try catch para pega outros erros e afins
    try {
        const newUser = await user.save();
        //criando o token do usuario
        const token = jwt.sign(
        //payload
        {
        name : newUser.name,
        id : newUser._id
        },
        "segredo" //isso tonar o nosso token único
        );
        //retornar o token para o projeto e manda mensagem
        res.json({
            error: null, 
            msg: "Você fez o cadastro com sucesso!!!", 
            token: token, 
            userId: newUser._id
        });
    } catch(error){
        res.status(400).json({error});
    }
});







router.post("/register", async(req, res) => {
    const codigo = req.body.codigo;
    const descricao = req.body.descricao;
    const fornecedor = req.body.fornecedor;
    const dataFab = req.body.dataFab;
    const estoque = req.body.estoque;
    //checando se todos os dados foram enviados
    if (codigo == null || descricao == null || fornecedor == null || dataFab == null || estoque == null){
        return res.status(400).json({error : "Por favor, preencha todos os campos"});
    }

    //conferindo se o usuário já existe
    const codigoExists = await Product.findOne({codigo : codigo});
    if(codigoExists){
        return res.status(400).json({error : "O código informado já existe."})
    }
    //criando o usuário após as validações no sistema
    const user = new Product({
        codigo : codigo,
        descricao : descricao,
        fornecedor : fornecedor,
        dataFab : dataFab,
        estoque : estoque
    });
    //montando um try catch para pega outros erros e afins
    try {
        const newProduct = await produto.save();
        //criando o token do usuario
        const token = jwt.sign(
        //payload
        {
        name : newProduct.name,
        id : newUser._id
        },
        "segredo" //isso tonar o nosso token único
        );
        //retornar o token para o projeto e manda mensagem
        res.json({
            error: null, 
            msg: "O item foi cadastrado com sucesso!!!", 
            token: token, 
            userId: newProduct._id
        });
    } catch(error){
        res.status(400).json({error});
    }
});
module.exports = router;