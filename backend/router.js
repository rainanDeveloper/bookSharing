const express = require('express')
const userController = require('./controllers/userController')
const authorController = require('./controllers/authorController')

const routes = express.Router()

// CRUD Users

routes.get('/users', userController.list)
routes.post('/users', userController.store)
routes.get('/users/:usr_id', userController.show)
//routes.put('/users/:usr_id', (request, response)=>{})
routes.delete('/users/:usr_id', userController.delete)

//CRUD authors

routes.get('/author', authorController.list)
routes.post('/author', authorController.store)
routes.get('/author/:auth_id', authorController.show)
//routes.put('/author/:auth_id', (request, response)=>{})
routes.delete('/author/:auth_id', authorController.delete)

//CRUD categories

module.exports = routes