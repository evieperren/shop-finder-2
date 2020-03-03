const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

mongoose.connect(`${process.env.DATABASE_NAME}`, { useNewUrlParser: true })
const database = mongoose.connection

database.once('open', function () {
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended : true }))
  app.use(bodyParser.json())
  
  app.use('/api', require('./router'))
  console.log('Reached src/index.js')
})

module.exports = app