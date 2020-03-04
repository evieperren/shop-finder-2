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
      town: req.body.location.town,
      online: req.body.location.online
    },
    scale: req.body.scale
  })
  try {
    res.send(shop)
    shop.save()

  } catch (err) {
    console.log(new Error(`Error: ${err.message}`))
  }
})

// get all 
ShopController.get('/', async (req, res, next) => {
    try {
      const result = await Shop.find()

      if(!result || result === undefined){
        throw new Error('There are no shops in database')
      }
      res.json(result)
      
    } catch (error){
      console.log( new Error(`Error: ${error} `))
    }
})

// get one
ShopController.get('/:id', async (req, res, next) => {
  try {
    const result = await Shop.findById(req.params.id)

    res.json(result)
  } catch (error) {
    console.log( new Error(`Could not find shop. ${error} `))
  }
})

// update
ShopController.put('/:id', async (req, res, next) => {
  try {
    const returnedShop = await Shop.findById(req.params.id)

    returnedShop.name = req.body.name || returnedShop.name
    returnedShop.type = req.body.type || returnedShop.type
    // must include one of these within a change ??
    returnedShop.location.postcode = req.body.location.postcode || returnedShop.location.postcode
    returnedShop.location.town = req.body.location.town || returnedShop.location.town
    returnedShop.location.town = req.body.location.online || returnedShop.location.online
    returnedShop.scale = req.body.scale || returnedShop.scale
  
    returnedShop.save()
    res.send(returnedShop)

  } catch (error) {
    console.log( new Error(`Error: ${error} `))
  }
})


// delete 
ShopController.delete('/:id', async (req, res, next) => {
  try {
    await Shop.findByIdAndRemove(req.params.id)
    res.json({
      "message": `${req.params.id} has been successfully`
    })

  } catch (error){
    console.log( new Error(`Error: ${error} `))
  }
})
module.exports = ShopController