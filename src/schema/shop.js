const mongoose = require('mongoose')

const ShopSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: {
    postcode: {
      type: String,
      uppercase: true,
      trim: true
    },
    town: {
      type: String,
      uppercase: true,
      trim: true
    },
    online: {
      type: Boolean,
      required: true
    }
  },
  scale: {
    type: String,
    required: false,
    enum: ['small', 'medium', 'large']
  }
})
module.exports = ShopSchema