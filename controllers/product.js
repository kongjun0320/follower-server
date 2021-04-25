const product = require("../models/product")

class ProductCtl {

 async find(ctx) {
  let { per_page = 7, page = 1 } = ctx.query
  page = Math.max(ctx.query.page * 1, 1) - 1
  const perPage = Math.max(per_page * 1, 1)
  ctx.body = await product.find()
    .limit(perPage)
    .skip(page * perPage)
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
    const findProduct = await product.findById(id)
      .select(selectFields)
      .populate(populateStr)
    if (!findProduct) {
      ctx.throw(404, 'product does not exist')
    } else {
      ctx.body = findProduct
    }
  }

  async create(ctx){
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
        type: {
          type: 'string',
          required: true
      }
    })
    const params = ctx.request.body
    const repeateProduct = await product.findOne({ name: params.name })
    if (repeateProduct) {
      ctx.throw(409, 'product already exist')
    } else {
      const createProduct = await new product(params).save()
      ctx.body = createProduct
    }
  }
  async update(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: false
      },
      type: {
        type: 'string',
        required: false
      }
    })
    const params = ctx.request.body
    const id = ctx.params.id
    const findProduct = await product.findOneAndUpdate({ _id: id }, params)
    if (!findProduct) {
      ctx.throw(404, 'product does not exist')
    } else {
      ctx.body = findProduct
    }
  }
}

module.exports = new ProductCtl()
