const express = require('express')
const Router = express.Router()

const router = new Router()
// router.use((req, res, next) => {
//   console.log('made it to the router page')
//   next()
// })
router.use('/admin', require('./controllers/shop-controller'))

module.exports = router