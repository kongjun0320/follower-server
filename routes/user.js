const Router = require('koa-router')
const jwt = require('koa-jwt')

const { find, login, create, findById, checkOwner, update } = require('../controllers/user')

const { secret } = require('../config')

const router = new Router({
  prefix: '/user'
})

const auth = jwt({ secret })

router.get('/', find)
router.get('/:id', findById)
router.post('/', create)
router.patch('/:id', auth, checkOwner, update)
router.post('/login', login)

module.exports = router
