const Router = require('koa-router')

const { find, create, findById,  update, delete: del } = require('../controllers/product')

const router = new Router({
  prefix: '/product'
})

router.get('/', find)
router.get('/:id', findById)
router.post('/', create)
router.patch('/:id',  update)
router.delete('/:id',  del)


module.exports = router
