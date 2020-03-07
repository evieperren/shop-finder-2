const mongoose = require('mongoose')

const ShopSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function() {
        return name === '' || name === Number
      },
      message: 'Please provide a valid name'
    }
  },
  type: {
    type: String,
    required: true, validate: {
      validator: function() {
        return type === '' || type === Number
      },
      message: 'Please provide a valid type'
    }
  },
  location: {
    postcode: {
      type: String,
      uppercase: true,
      trim: true,
      validate: {
        validator: function() {
          return location === ''
        },
        message: 'Please provide a valid location'
      }
    },
    town: {
      type: String,
      uppercase: true,
      trim: true,
      validate: {
        validator: function() {
          return town === ''
        },
        message: 'Please provide a postcode'
      }
    },
    online: {
      type: Boolean,
      required: true,
      validate: {
        validator: function () {
          return online !== Boolean
        },
        message: 'Please provide a boolean value'
      }
    }
  },
  scale: {
    type: String,
    required: false,
    enum: ['small', 'medium', 'large'],
    validate: {
      validator: function () {
        return scale !== 'small' || scale !== 'medium' || scale !==  'large'
      },
      message: 'Please provide a valid size'
    }
  }
})
module.exports = ShopSchema