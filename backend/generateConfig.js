const crypto = require('crypto')
const prompt = require('prompt')

const properties = [
    {
        name: 'username',
        validator: /^[a-zA-Z\-_]+$/,
        warning: 'Username deve conter apenas números, dashes(-) e underlines'
    },
    {
        name: 'password',
        hidden: true
    }
]

prompt.start()

prompt.get(properties, function(error, result){
    if (error) { return onErr(err)}
    var config = {
        host: '127.0.0.1',
        username: result.username,
        password: result.password,
        database: 'book_sharing',
        dialect: 'mysql',
        SECRET: crypto.randomBytes(16).toString('hex')
    }

    console.log(JSON.stringify(config,null,'\t'))
})

