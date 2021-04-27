const category = require("../models/category")

class CategoryCtl {

 async find(ctx) {
  let { per_page = 7, page = 1 } = ctx.query
  page = Math.max(ctx.query.page * 1, 1) - 1
  const perPage = Math.max(per_page * 1, 1)
  ctx.body = await category.find()
    .limit(perPage)
    .skip(page * perPage)
    .populate('foods')
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
    const findCategory = await category.findById(id)
      .select(selectFields)
      .populate(populateStr)
    if (!findCategory) {
      ctx.throw(404, 'category does not exist')
    } else {
      ctx.body = findCategory
    }
  }

  async create(ctx){
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      },
      type: {
        type: 'number',
        required: true
      }
    })
    const params = ctx.request.body
    const repeateCategory = await category.findOne({ name: params.name })
    if (repeateCategory) {
      ctx.throw(409, 'category already exist')
    } else {
      const createCategory = await new category(params).save()
      ctx.body = createCategory
    }
  }
  async update(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: false
      },
      type: {
        type: 'number',
        required: false
      }
    })
    const params = ctx.request.body
    const id = ctx.params.id
    const findCategory = await category.findOneAndUpdate({ _id: id }, params)
    if (!findCategory) {
      ctx.throw(404, 'category does not exist')
    } else {
      ctx.body = findCategory
    }
  }
}

module.exports = new CategoryCtl()
