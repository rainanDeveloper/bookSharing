require('dotenv').config()


module.exports =  {
  user:     process.env.DB_USER,
  pass:     process.env.DB_PASS,
  db:       process.env.DB_NAME,
  params: {
    host:   process.env.DB_HOST,
    port:   process.env.DB_PORT,
    dialect: 'mysql',
  },
};