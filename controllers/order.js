const order = require('../models/order')

class OrderCtl {
  async find(ctx) {
    let { per_page = 7, page = 1 } = ctx.query
    page = Math.max(ctx.query.page * 1, 1) - 1
    const perPage = Math.max(per_page * 1, 1)
    const userList = await order
      .find()
      .limit(perPage)
      .skip(page * perPage)
    const total = await await order.countDocuments()
    ctx.body = {
      user: userList,
      total
    }
  }

  async findById(ctx) {
    const { fields = '' } = ctx.query
    const selectFields = fields
      .split(';')
      .filter((f) => f)
      .map((f) => ' +' + f)
      .join('')
    const populateStr = fields
      .split(';')
      .filter((f) => f)
      .join(' ')
    const id = ctx.params.id
    const findOrder = await order
      .findById(id)
      .select(selectFields)
      .populate(populateStr)
    if (!findOrder) {
      ctx.throw(404, 'order does not exist')
    } else {
      ctx.body = findOrder
    }
  }

  async create(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
      description: {
        type: 'string',
        required: true
      }
    })
    const params = ctx.request.body
    const repeateOrder = await order.findOne({ name: params.name })
    if (repeateOrder) {
      ctx.throw(409, 'order already exist')
    } else {
      const createOrder = await new order(params).save()
      ctx.body = createOrder
    }
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
      }
    })
    const params = ctx.request.body
    const id = ctx.params.id
    const findOrder = await order.findOneAndUpdate({ _id: id }, params)
    if (!findOrder) {
      ctx.throw(404, 'order does not exist')
    } else {
      ctx.body = findOrder
    }
  }
}

module.exports = new OrderCtl()
