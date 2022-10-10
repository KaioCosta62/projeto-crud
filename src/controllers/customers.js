const CustumersModel = require('../models/customers');
const { crypto } = require('../utils/password');
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const defaultTitle = 'Cadastro de Clientes';

function index(req, res) {
  res.render('register', {
    title: defaultTitle,
  });
}

async function add(req, res) {
  const { name, age, email, password } = req.body;

  const passwordCrypto = await crypto(password);

  const register = new CustumersModel({
    name,
    age,
    email,
    password: passwordCrypto,
  });

  register.save();

  res.render('register', {
    title: defaultTitle,
    message: 'Cadastro realizado com sucesso',
  });
}

async function list(req, res) {
  const users = await CustumersModel.find();
  res.render('list', {
    title: 'Listagem de Usuários',
    users,
  });
}

async function formEdit(req, res) {
  const { id } = req.query;

  const user = await CustumersModel.findById(id);

  res.render('edit', {
    title: 'Editar usuário',
    user,
  });
}

async function edit(req, res) {
  const { name, age, email } = req.body;

  const { id } = req.params;

  const user = await CustumersModel.findById(id);

  user.name = name;
  user.age = age;
  user.email = email;

  user.save();

  res.render('edit', {
    title: 'Editar usuário',
    user,
    message: 'Usuário alterado com sucesso',
  });
}

function remove(req, res) {
  rl.question('Você deseja remover o item? (s) (n): ', async (remover )=> {
    if(remover === 's'){
      const { id } = req.params;
      const remove = await CustumersModel.deleteOne({ _id: id });
    
      if(remove.deletedCount){
        res.redirect('/list')
      }
    }else{
      res.redirect('/')
    }
  })
}

module.exports = {
  index,
  add,
  list,
  formEdit,
  edit,
  remove,
};
