const seller = require('../models/seller')

class SellerCtl {
  async find(ctx) {
    ctx.body = await seller.find()
  }
  async create(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
      description: {
        type: 'string',
        required: false
      },
      deliveryTime: {
        type: 'string',
        required: false
      },
      score: {
        type: 'string',
        required: false
      },
      serviceScore: {
        type: 'string',
        required: false
      },
      foodScore: {
        type: 'string',
        required: false
      },
      rankRate: {
        type: 'string',
        required: false
      },
      deliveryPrice: {
        type: 'string',
        required: false
      },
      ratingCount: {
        type: 'string',
        required: false
      },
      sellCount: {
        type: 'string',
        required: false
      },
      bulletin: {
        type: 'string',
        required: false
      },
      avatar: {
        type: 'string',
        required: false
      }
    })
    const params = ctx.request.body
    const createSeller = await new seller(params).save()
    ctx.body = createSeller
  }
  async update(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: false
      },
      description: {
        type: 'string',
        required: false
      },
      deliveryTime: {
        type: 'string',
        required: false
      },
      score: {
        type: 'string',
        required: false
      },
      serviceScore: {
        type: 'string',
        required: false
      },
      foodScore: {
        type: 'string',
        required: false
      },
      rankRate: {
        type: 'string',
        required: false
      },
      deliveryPrice: {
        type: 'string',
        required: false
      },
      ratingCount: {
        type: 'string',
        required: false
      },
      sellCount: {
        type: 'string',
        required: false
      },
      bulletin: {
        type: 'string',
        required: false
      },
      avatar: {
        type: 'string',
        required: false
      }
    })
    const params = ctx.request.body
    const id = ctx.params.id
    const findSeller = await seller.findOneAndUpdate({ _id: id }, params)
    ctx.body = findSeller
  }
}

module.exports = new SellerCtl()
