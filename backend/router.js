const express = require('express')
const userController = require('./controllers/userController')
const authorController = require('./controllers/authorController')
const categoryController = require('./controllers/categoryController')
const bookController = require('./controllers/bookController')

const routes = express.Router()

// CRUD Users

routes.post('/users', userController.store)
routes.get('/users', userController.list)
routes.get('/users/:usr_id', userController.show)
routes.post('/users/login', userController.login)
//routes.put('/users/:usr_id', (request, response)=>{})
routes.put('/users/location', userController.changeLocation)
//routes.put('/users/avatar', userController.changeAvatarImage)
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

// books
routes.post('/book', bookController.store)
routes.get('/book/:bk_id', bookController.show)
routes.get('/book', bookController.list)
routes.delete('/book/:bk_id', userController.validateJWT, bookController.delete)
routes.post('/book/request/', userController.validateJWT, bookController.storeBookRequest)
routes.post('/book/share/', userController.validateJWT, bookController.storeBookShare)

module.exports = routes