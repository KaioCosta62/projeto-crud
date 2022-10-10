const CostumersModel = require('../models/customers')
const {crypto} = require('../utils/password')

const defaultTitle = 'Cadastro de Clientes'

function index(req, res){
  res.render('register', {
    title: defaultTitle
  })
}

async function add(req,res){
  const {
    name,
    age,
    email,
    password
  } = req.body

  const passwordCrypto = await crypto(password)

  const register = new CostumersModel({
    name,
    age,
    email,
    password: passwordCrypto
  })

  register.save()

  res.render('register', {
    title: defaultTitle,
    message: 'Cadastro realizado com'
  })
}

async function listUsers(req,res){
  const users = await CostumersModel.find()
  res.render('listUsers', {
    title: 'Listagem de Usuários',
    users
  })
}

module.exports = {
  index,
  add,
  listUsers
}