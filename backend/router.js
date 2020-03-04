const express = require('express')

const routes = express.Router()

// CRUD Users

routes.get('/users', (request, response)=>{})
routes.post('/users', (request, response)=>{})
routes.get('/users:id', (request, response)=>{})
routes.put('/users:id', (request, response)=>{})
routes.delete('/users:id', (request, response)=>{})

//CRUD authors

//CRUD categories