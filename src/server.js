const knex = require('knex')
const app = require('./app')
const { PORT, DATABASE_URL } = require('./config')

const db = knex({
  client:'pg',
  connection: DATABASE_URL,
  /*connection: {
    host : '127.0.0.1',
    user : 'dunder_mifflin',
    password : 'password',
    database : 'noteful'
  }*/
})
app.set('db',db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})