const express = require('express')
const Router = express.Router

const router = new Router()
router.use((req, res, next) => {
  console.log('Reached src/router.js')
  next()
})
router.use('/admin', require('./controllers/shop-controller'))

module.exports = router