const express = require('express')
const mongoose = require('mongoose')
const sanitize = require('mongo-sanitize');

const Router = express.Router
const ShopSchema = require('../schema/shop')
const Shop = mongoose.model('Shops', ShopSchema)
const ShopController = new Router()

ShopController.use('/', (req, res, next) => {
  console.log('Reached src/controllers/shop-controller.js')
  req.body = sanitize(req.body)
  next()
})

// create 
ShopController.post('/', (req, res, next) => {
  shop = new Shop({
    name: req.body.name, 
    type: req.body.type,
    location: {
      postcode: req.body.location.postcode,
      town: req.body.location.town,
      online: req.body.location.online
    },
    scale: req.body.scale
  })
  try {
    shop.validate( function(error) {
      if(error){
        res.status(400).send(error.message) 
      } else {
        shop.save()
        res.status(201).send(shop)
      }
    })
  } catch (error) {
    res.status(400).send(new Error(error.message))
  }
})

// get all 
ShopController.get('/', async (req, res, next) => {
    try {
      const result = await Shop.find().sort('name')
      res.json(result)
    } catch (error){
      res.status(404).send(new Error(error.message))
    }
})

// get one
ShopController.get('/:id', async (req, res, next) => {
  try {
    const result = await Shop.findById(req.params.id)
    res.json(result)
  } catch (error) {
    res.status(404).send(new Error(error.message))
  }
})

// update
ShopController.put('/:id', async (req, res, next) => {
  try {
    const returnedShop = await Shop.findById(req.params.id)
    
    returnedShop.name = req.body.name || returnedShop.name
    returnedShop.type = req.body.type || returnedShop.type
    returnedShop.location.postcode = req.body.location.postcode || returnedShop.location.postcode
    returnedShop.location.town = req.body.location.town || returnedShop.location.town
    returnedShop.location.online = req.body.location.online || returnedShop.location.online
    returnedShop.scale = req.body.scale || returnedShop.scale
  
    returnedShop.validate(function(error){
      if(error){
        res.status(400).send(error.message)
      } else {
        returnedShop.save()
        res.status(202).send(returnedShop)
      }
    })
  } catch (error) {
    res.status(400).send(new Error(error.message))
  }
})


// delete 
ShopController.delete('/:id', async (req, res, next) => {
  try {
    await Shop.findByIdAndDelete(req.params.id)
    res.json({
      "message": `${req.params.id} has been successfully`
    })
  } catch (error){
    res.status(400).send(new Error(error.message))
  }
})

module.exports = ShopController