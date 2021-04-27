const Router = require('koa-router')

const { find, create, update } = require('../controllers/seller')

const router = new Router({
  prefix: '/seller'
})

router.get('/', find)
router.patch('/:id', update)
router.post('/', create)



module.exports = router
