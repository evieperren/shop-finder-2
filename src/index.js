const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const winston = require('winston')


winston.add( new winston.transports.File({ filename: 'logFile.log'}))
const app = express()

mongoose.connect(`${process.env.DATABASE_NAME}`, { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => {
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended : true }))
    app.use(bodyParser.json())
    
    app.use('/api', require('./router'))
    console.log('Reached src/index.js')

  })
  .catch((error) =>  {
    winston.error(error.message, error)
    console.log(`Could not connect to database. ${error}`)
  })

module.exports = app
