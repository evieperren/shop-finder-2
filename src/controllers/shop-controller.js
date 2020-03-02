const express = require('express')
const mongoose = require('mongoose')
const Router = express.Router
const ShopSchema = require('../schema/shop')

const Shop = mongoose.model('Shops', ShopSchema)

const ShopController = new Router()

ShopController.use('/', (req, res, next) => {
  console.log('Reached src/controllers/shop-controller.js')
  next()
})

// create 
ShopController.post('/', (req, res, next) => {
  shop = new Shop({
    name: req.body.name, 
    type: req.body.type,
    location: {
      postcode: req.body.location.postcode,
      town: req.body.location.town
    }
  })
  res.send(shop)
  shop.save()
})

// get all 
ShopController.get('/', async (req, res, next) => {
  const result = await Shop.find()
  res.json(result)
})

// get one
ShopController.get('/:id', async (req, res, next) => {
  const result = await Shop.findById(req.params.id)
  res.json(result)
})

// update all fields

// partial up date

// delete 
ShopController.delete('/:id', async (req, res, next) => {
  await Shop.findByIdAndRemove(req.params.id)
    .then (() => {
      res.json({
        "message": `${req.params.id} has been successfully`
      })
    })
})
module.exports = ShopController