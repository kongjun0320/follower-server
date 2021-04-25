const Router = require('koa-router')
const { upload } = require('../controllers/home')

const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'home page'
})
router.post('/upload', upload)

module.exports = router
