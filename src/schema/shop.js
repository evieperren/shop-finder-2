const mongoose = require('mongoose')

const ShopSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a valid value']
  },
  type: {
    type: String,
    required: [true, 'Please provide a type']
  },
  location: {
    postcode: {
      type: String,
      uppercase: true,
      trim: true,
      required: [true, 'Please provide a postcode']
    },
    town: {
      type: String,
      uppercase: true,
      trim: true,
      required: [true, 'Please provide a town']
    },
    online: {
      type: Boolean,
      required: [true, 'Please provide a boolean value'],
    },
  },
  scale: {
    type: String,
    required: false,
    enum: ['small', 'medium', 'large']
  }
})
module.exports = ShopSchema