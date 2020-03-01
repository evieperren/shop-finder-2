const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

mongoose.connect('mongodb://localhost:27018/shop-finder-2', { useNewUrlParser: true })
const database = mongoose.connection

database.once('open', () => {
  // google need for cors
  app.use(cors())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())

  console.log('database is connected')
  app.use('/api', require('./router'))
})
// this line makes server.listen pass
module.exports = app