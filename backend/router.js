const express = require('express')
const userController = require('./controllers/userController')
const authorController = require('./controllers/authorController')
const categoryController = require('./controllers/categoryController')
const bookController = require('./controllers/bookController')
const bkRequestController = require('./controllers/bookRequestController')
const bkShareController = require('./controllers/bookShareController')
const path = require('path')


const routes = express.Router()

routes.use('/', express.static(path.join(__dirname, '../frontend/build')))
routes.use('/SignUp', express.static(path.join(__dirname, '../frontend/build')))
routes.use('/dashboard', express.static(path.join(__dirname, '../frontend/build')))

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
routes.get('/book/:bk_id/show', bookController.show)
routes.get('/book', bookController.list)
routes.get('/book/search/', bookController.search)
routes.delete('/book/:bk_id', userController.validateJWT, bookController.delete)

//CRUD Book requests

routes.post('/book/request/', userController.validateJWT, bkRequestController.store)
routes.get('/book/request/', userController.validateJWT, bkRequestController.list)
routes.delete('/book/request/:id', userController.validateJWT, bkRequestController.delete)

//CRUD Book shares

routes.post('/book/share/', userController.validateJWT, bkShareController.store)
//routes.get('/book/share/', userController.validateJWT, bookController.listBookShare)
//routes.delete('/book/share/:id', userController.validateJWT, bookController.deleteBookShare)

module.exports = routes