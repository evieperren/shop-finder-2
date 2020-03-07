const mongoose = require('mongoose')

const ShopSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a valid value'],
    validate: {
      validator: (value) => {
        return /([a-zA-Z]{1,144})[^<>%$=]\w/.test(value)
      },
      message: 'Please provide a string between 1 and 144 characters'
    }
  },
  type: {
    type: String,
    required: [true, 'Please provide a type'],
    validate: {
      validator: (value) => {
        return /([a-zA-Z]{2,144})\w/.test(value)
      },
      message: 'Please provide a string between 2 and 144 characters'
    }
  },
  location: {
    postcode: {
      type: String,
      uppercase: true,
      trim: true,
      required: [true, 'Please provide a postcode'],
      validate: {
        validator: (value) => {
          return /((^([a-zA-Z]){1,2})([0-9]{1,2})([a-zA-Z]{1})? ([0-9]{1})(([a-zA-Z]){2}))/.test(value)
        },
        message: 'Please provide a valid postcode'
      }
    },
    town: {
      type: String,
      uppercase: true,
      trim: true,
      required: [true, 'Please provide a town'],
      validate: {
        validator: (value) => {
          return /([a-zA-Z]{2,144})\w/.test(value)
        },
        message: 'Please provide a string between 2 and 144 characters'
      }
    },
    city: {
      type: String,
      uppercase: true,
      trim: true,
      required: [true, 'Please provide a city'],
      validate: {
        validator: (value) => {
          return /([a-zA-Z]{2,144})\w/.test(value)
        },
        message: 'Please provide a string between 2 and 144 characters'
      }
    },
    online: {
      type: Boolean,
      required: [true, 'Please provide a boolean value'],
    },
  },
  scale: {
    type: String,
    required: false,
    enum: ['small', 'medium', 'large', 'massive']
  }
})
module.exports = ShopSchema
