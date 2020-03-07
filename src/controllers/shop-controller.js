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
    validate(shop, res)
  } catch (error) {
    console.log(new Error(`Error: ${error.message}`))
  }
})

// get all 
ShopController.get('/', async (req, res, next) => {
    try {
      const result = await Shop.find().sort('name')
      res.json(result)
      
    } catch (error){
      console.log( new Error(`Error: ${error.message} `))
    }
})

// get one
ShopController.get('/:id', async (req, res, next) => {
  try {
    const result = await Shop.findById(req.params.id)
    res.json(result)
  } catch (error) {
    console.log( new Error(`Could not find shop. Please check ID.  ${error.message} `))
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
    returnedShop.location.online = req.body.location.online || returnedShop.location.online
    returnedShop.scale = req.body.scale || returnedShop.scale
  
    returnedShop.save()
    res.send(returnedShop)

  } catch (error) {
    console.log( new Error(`Error: ${error.message} `))
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
    console.log( new Error(`Error: ${error.message} `))
  }
})

function validate(item, res){
  if(item.name === '' || typeof item.name == Number){
    res.status(400).send('Please provide a value for the name')
  }
  if (item.type === '' || typeof item.type == Number ){
    res.status(400).send('Please provide a valid value for type')
  } 
  if (item.location.postcode){
    // res.status(400).send('Please provide a valid postcode')
    res.send(typeof item.location.postcode)

  } 
  // if (item.location.online !== true || item.location.online !== false){
  //   res.status(400).send('Please provide a boolean value')
  // } 
  // if (item.location.town === '' || typeof item.location.town !== String ){
  //   res.status(400).send('Please provide a valid town')
  // } 
  // else if (item.scale !== 'small' || item.scale !== 'medium' || item.scale !==  'large'){
  //   res.status(400).send('Please provide a valid value')
  // }
  else {
    // item.save()
    // res.send(item)
  }
}
module.exports = ShopController