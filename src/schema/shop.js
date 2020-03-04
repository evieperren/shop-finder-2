const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const ShopSchema  = Joi.object().keys({
  name: Joi.string()
    .required(),
  type: Joi.string()
    .required(),
  location: {
    postcode: Joi.string()
      .required()
      .uppercase()
      .trim(),
    town: Joi.string()
      .required()
      .uppercase()
      .trim(),
    online: Joi.string()
      .required()
      .uppercase()
      .trim()
  },
  scale: Joi.string()
    .required()
    .valid('small', 'medium', 'large')

})
// const ShopSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   type: {
//     type: String,
//     required: true
//   },
//   location: {
//     postcode: {
//       type: String,
//       uppercase: true,
//       trim: true
//     },
//     town: {
//       type: String,
//       uppercase: true,
//       trim: true
//     },
//     online: {
//       type: Boolean,
//       required: true
//     }
//   },
//   scale: {
//     type: String,
//     required: false,
//     enum: ['small', 'medium', 'large']
//   }
// })
module.exports = ShopSchema