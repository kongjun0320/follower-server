const mongoose = require('mongoose')

const { Schema, model } = mongoose

const sellerSchema = new Schema({
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
    required: false,
  },
  deliveryTime: {
    type: String,
    required: false,
  },
  score: {
    type: String,
    required: false,
  },
  serviceScore: {
    type: String,
    required: false,
  },
  foodScore: {
    type: String,
    required: false,
  },
  rankRate: {
    type: String,
    required: false,
  },
  deliveryPrice: {
    type: String,
    required: false,
  },
  ratingCount: {
    type: String,
    required: false,
  },
  sellCount: {
    type: String,
    required: false,
  },
  bulletin: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  }
})

module.exports = model('Seller', sellerSchema)
