// Importando os módulos
const express = require('express')
const path = require('path')

const routes = require('./routes/index')
const db = require('./database/index')

//Inicializando o express
const app = express()

//Conexão com o banco de dados
db.connect()

//Definindo o templete engine (EJS)
app.set('view engine', 'ejs')

// Definindo os arquivos estáticos(que estão na pasta views)
app.set('views', path.join(__dirname, 'views'))

//Definindo os arquivos públicos(que estão na pasta public)
app.use(express.static(path.join(__dirname, 'public')))

//Habilita o server para receber dados via post formulários
app.use(express.urlencoded({ extended: true }))

// Definindo as rotas
app.use('/', routes)

//404 Error Not Found
app.use((req, res) => {
  res.send('Página não encontrada')
})

//Executando o servidor
const port = process.env.PORT || 5500
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
