const getCachedImage = require('./services/image-service')
const axios = require('axios')
const bodyParser = require('body-parser');
const express = require('express')
const app = express()

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', async (request, response) => {
  const imageBase64 = await getCachedImage()
  const todos = await axios.get(process.env.BACKEND_URL)
  const data = {
    image: imageBase64,
    todos: todos.data
  }
  response.render('pages/index', data)
})

app.post('/', async (request, response) => {
    console.log('Adding a todo')
    await axios.post(process.env.BACKEND_URL,
      {content: request.body.todoInput},
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    console.log('Todo added')
    response.redirect('/')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server started in port ${PORT}`))