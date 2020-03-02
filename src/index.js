const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

mongoose.connect('mongodb://localhost:27018/shop-finder-2', { useNewUrlParser: true })
const database = mongoose.connection

database.once('open', function () {
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended : true }))
  app.use(bodyParser.json())
  
  // Routes 
  app.use('/api', require('./router'))
  console.log('Reached src/index.js')
})
// this line makes server.listen pass
module.exports = app