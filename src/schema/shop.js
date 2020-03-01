const mongoose = require('mongoose')

const ShopSchema = mongoose.Schema({
  name: String,
  type: String,
  location: {
    postcode: String,
    town: String
  }
})

module.exports = ShopSchema