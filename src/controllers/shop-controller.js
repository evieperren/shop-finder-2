const express = require('express')
const mongoose = require('mongoose')
const Router = express.Router()
const ShopSchema = require('../schema/shop')

const Shop = mongoose.model('Shops', ShopSchema)

const ShopController = new Router()

// ShopController.get('/', (req, res, next) => {
//   console.log('made it to shop controller ')
// })
ShopController.get('/', (req, res, next) => {
  console.log(req)
  // console.log('made it to shop controller ')
})
module.exports = ShopController