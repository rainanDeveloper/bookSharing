const mysql = require('mysql2')
const config = require('./config')
const connection = mysql.createConnection({
    host: config.params.host,
    port: config.params.port,
    user: config.user,
    password: config.pass,
    database: config.db
})


const insertUser = ()=>{
    
}