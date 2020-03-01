const express = require('express')
const router = express.Router()

// const router = new Router()

// router.use((req, res, next) => {
//   console.log('made it to the router page')
//   next()
// })
console.log('made it to routers page')
router.use('/admin', require('./controllers/shop-controller'))
module.exports = router