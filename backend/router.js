const express = require('express')
const userController = require('./controllers/userController')
const authorController = require('./controllers/authorController')
const categoryController = require('./controllers/categoryController')

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

routes.get('/category', categoryController.list)
routes.post('/category', categoryController.store)
routes.get('/category/:cat_id', categoryController.show)
//routes.put('/category/:cat_id', (request, response)=>{})
routes.delete('/category/:cat_id', categoryController.delete)

module.exports = routes