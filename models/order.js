const mongoose = require('mongoose')

const { Schema, model } = mongoose

const orderSchema = new Schema({
  __v: {
    type: Number,
    select: false
  },
  // 订单编号 用户  商品  商品图片 价格 电话 地址  下单时间
  location: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  paytime: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  info: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  price: {
    type: String,
    required: false
  },
  oldPrice: {
    type: String,
    required: false
  },
  count: {
    type: String,
    required: false
  },
  sellCount: {
    type: String,
    required: false
  }
})

module.exports = model('Order', orderSchema)
