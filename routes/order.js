const Router = require('koa-router')

const { find, create, findById,  update, delete: del } = require('../controllers/order')

const router = new Router({
  prefix: '/order'
})

router.get('/', find)
router.get('/:id', findById)
router.post('/', create)
router.patch('/:id',  update)
router.delete('/:id',  del)


module.exports = router
