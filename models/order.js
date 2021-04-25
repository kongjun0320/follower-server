const mongoose = require('mongoose')

const { Schema, model } = mongoose

const orderSchema = new Schema({
  __v: {
    type: Number,
    select: false
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  },
  image: {
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
  count: {
    type: String,
    required: true
  },
  sellCount: {
    type: String,
    required: true
  }
})

module.exports = model('Order', orderSchema)
