const mongoose = require('mongoose')

const ShopSchema = mongoose.Schema({
  name: {type: String, required: true},
  type: String,
  location: {
    postcode: String,
    town: String
  }
})

module.exports = ShopSchema