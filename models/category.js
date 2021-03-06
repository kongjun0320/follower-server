const mongoose = require('mongoose')

const { Schema, model } = mongoose

const categorySchema = new Schema({
  __v: {
    type: Number,
    select: false
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: '描述信息'
  },
  foods: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    required: false
  }
})

module.exports = model('Category', categorySchema)
