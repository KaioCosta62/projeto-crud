// Importando os módulos
const express = require('express')
const path = require('path')

//Inicializa o express
const app = express()

//Definindo o templete engine (EJS)
app.set('view engine', 'ejs')

// Definindo os arquivos estáticos(que estão na pasta views)
app.set('views', path.join(__dirname, 'views'))

//Definindo os arquivos públicos(que estão na pasta public)
app.use(express.static(path.join(__dirname, 'public')))

//Habilita o server para receber dados via post formulários
app.use(express.urlencoded({extended: true}))

//Rotas
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home'
  })
})

//404 Error Not Found
app.use((req,res) => {
  res.send('Página não encontrada')
})

//Executando o servidor
const port = process.env.PORT || 5500
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})