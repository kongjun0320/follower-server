const jsonWebToken = require('jsonwebtoken')
const user = require("../models/user")
const { secret } = require('../config')

class UserCtl {

 async find(ctx) {
  let { per_page = 7, page = 1 } = ctx.query
  page = Math.max(ctx.query.page * 1, 1) - 1
  const perPage = Math.max(per_page * 1, 1)
  const userList = await user.find()
    .limit(perPage)
    .skip(page * perPage)
   const total = (await user.countDocuments());
    ctx.body = {
      user: userList,
      total
    }
  }

  async findById(ctx) {
    // const { fields = '' } = ctx.query
    // const selectFields = fields
    //   .split(';')
    //   .filter((f) => f)
    //   .map((f) => ' +' + f)
    //   .join('')
    // const populateStr = fields
    //   .split(';')
    //   .filter((f) => f)
    //   .join(' ')
    const id = ctx.params.id
    // const findUser = await user.findById(id)
    //   .select(selectFields)
    //   .populate(populateStr)
    const findUser = await user.findById(id)
    if (!findUser) {
      ctx.throw(404, 'user does not exist')
    } else {
      ctx.body = findUser
    }
  }

  async create(ctx){
    ctx.verifyParams({
      username: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      }
    })
    const params = ctx.request.body
    const createUser = await new user(params).save()
    ctx.body = createUser
    // const repeateUser = await user.findOne({ username: params.username })
    // if (repeateUser) {
    //   ctx.throw(409, 'user already exist')
    // } else {
    //   const createUser = await new user(params).save()
    //   ctx.body = createUser
    // }
  }

  async checkOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, 'forbidden')
    }
    await next()
  }

  async update(ctx) {
    ctx.verifyParams({
      username: {
        type: 'string',
        required: false
      },
      password: {
        type: 'string',
        required: false
      },
      avator_url: {
        type: 'string',
        required: false
      },
      gender: {
        type: 'string',
        required: false
      },
      description: {
        type: 'string',
        required: false
      },
      age: {
        type: 'string',
        required: false
      },
      location: {
        type: 'string',
        required: false
      },
      phone: {
        type: 'string',
        required: false
      },
      nickname: {
        type: 'string',
        required: false
      }
    })
    const params = ctx.request.body
    const id = ctx.params.id
    const findUser = await user.findOneAndUpdate({ _id: id }, params)
    if (!findUser) {
      ctx.throw(404, 'user does not exist')
    } else {
      ctx.body = findUser
    }
  }

  async login(ctx) {
    
    ctx.verifyParams({
      username: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      }
    })
    const params = ctx.request.body
    const loginUser = await user.findOne(params)
    if (!loginUser) {
      // ctx.throw(401, 'username or password error')
      ctx.verifyParams({
        username: {
          type: 'string',
          required: true
        },
        password: {
          type: 'string',
          required: true
        }
      })
      const params = ctx.request.body
      const repeateUser = await user.findOne({ username: params.username })
      if (repeateUser) {
        ctx.throw(409, 'user already exist')
      } else {
        const createUser = await new user(params).save()
        ctx.body = createUser
      }
      return
    }
    const { _id, name } = loginUser
    const token = jsonWebToken.sign({ _id, name }, secret, { expiresIn: '1d' })
    ctx.body = { token,  loginUser}
  }

  async delete(ctx) {
    await user.findByIdAndRemove(ctx.params.id)
    ctx.status = 204
  }
}

module.exports = new UserCtl()
