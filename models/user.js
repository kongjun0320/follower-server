const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
  __v: {
    type: Number,
    select: false
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: true
  },
  avator_url: {
    type: String
  },
  image: {
    type: String,
    select: true
  },
  gender: {
    type: String,
    default: 'male',
    select: true
  },
  description: {
    type: String,
    select: true
  },
  age: {
    type: String,
    select: true
  },
  location: {
    type: String,
    select: true
  },
  phone: {
    type: String,
    select: true
  },
  nickname: {
    type: String,
    select: true
  }
})

module.exports = model('User', userSchema)
