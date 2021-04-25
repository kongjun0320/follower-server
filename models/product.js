const mongoose = require('mongoose')

const { Schema, model } = mongoose

const productSchema = new Schema({
  __v: {
    type: Number,
    select: false
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  oldPrice: {
    type: String,
    required: true
  },
  description: {
    type: String,
    select: true
  },
  sellCount: {
    type: String,
    select: true
  },
  image: {
    type: String,
    select: true
  }
})

module.exports = model('Product', productSchema)
