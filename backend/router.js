const express = require('express')
const userController = require('./controllers/userController')

const routes = express.Router()

// CRUD Users

routes.get('/users', userController.list)
routes.post('/users', userController.store)
routes.get('/users/:usr_id', userController.show)
//routes.put('/users/:usr_id', (request, response)=>{})
routes.delete('/users/:usr_id', userController.delete)

//CRUD authors

//CRUD categories

module.exports = routes