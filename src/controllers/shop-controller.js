const express = require('express')
const mongoose = require('mongoose')
const sanitize = require('mongo-sanitize');

const Router = express.Router
const ShopSchema = require('../schema/shop')
const Shop = mongoose.model('Shops', ShopSchema)
const ShopController = new Router()

const winston = require('winston')

ShopController.use('/', (req, res, next) => {
  console.log('Reached src/controllers/shop-controller.js')
  req.body = sanitize(req.body)
  next()
})

// create 
ShopController.post('/', (req, res) => {
  const shop = new Shop({
    name: req.body.name, 
    type: req.body.type,
    location: {
      postcode: req.body.location.postcode,
      town: req.body.location.town,
      city: req.body.location.city,
      online: req.body.location.online
    },
    scale: req.body.scale
  })
  try {
    shop.validate( function(error) {
      if(error){
        winston.log('error', error.message)
        res.status(400).send(error.message) 

      } else {
        shop.save()
        res.status(201).send(shop)
      }
    })
  } catch (error) {
    winston.log('error', error.message)
    res.status(400).send(`Unable to create shop. ${error.message}`)
  }
})

// get all 
ShopController.get('/', async (req, res) => {
    try {
      const result = await Shop.find().sort('name')
      res.json(result)
    } catch (error){
      winston.log('error', error.message)
      res.status(404).send(`Unable to find shops. ${error.message}`)
    }
})

// get one
ShopController.get('/:id', async (req, res) => {
  try {
    const result = await Shop.findById(req.params.id)
    res.json(result)
  } catch (error) {
    winston.log('error', error.message)
    res.status(404).send((`Unable to find shop. ${error.message}`))
  }
})

// update
ShopController.put('/:id', async (req, res) => {
  try {
    const returnedShop = await Shop.findById(req.params.id)
    
    returnedShop.name = req.body.name || returnedShop.name
    returnedShop.type = req.body.type || returnedShop.type
    returnedShop.location.postcode = req.body.location.postcode || returnedShop.location.postcode
    returnedShop.location.town = req.body.location.town || returnedShop.location.town
    returnedShop.location.city = req.body.location.city || returnedShop.location.city
    returnedShop.location.online = req.body.location.online || returnedShop.location.online
    returnedShop.scale = req.body.scale || returnedShop.scale
  
    returnedShop.validate(function(error){
      if(error){
        winston.log('error', error.message)
        res.status(400).send(error.message)
      } else {
        returnedShop.save()
        res.status(202).send(returnedShop)
      }
    })
  } catch (error) {
    winston.log('error', error.message)
    res.status(400).send(`Unable to update shop. ${error.message}`)
  }
})


// delete 
ShopController.delete('/:id', async (req, res) => {
  try {
    try {
      await Shop.findById(req.params.id)

    } catch (error){
      winston.log('error', error.message)
      res.status(400).send(`Unable to delete shop. ${error.message}`)
    }
    await Shop.deleteOne({ id: req.params.id})
    res.json({
      "message": `${req.params.id} has been successfully`
    })
    
  } catch (error){
    winston.log('error', error.message)
    res.status(400).send(`Unable to delete shop. ${error.message}`)
  }
})

module.exports = ShopController
