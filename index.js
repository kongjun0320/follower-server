const path = require('path')
const Koa = require('koa')
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const parameter = require('koa-parameter')
const static = require('koa-static')

const routing = require('./routes')

const app = new Koa()

// 连接mongoDB数据库
require('./db')
// 静态资源目录
app.use(static(path.join(__dirname, 'public')))
// 跨域
app.use(cors())
// 处理body参数和文件上传
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '/public/uploads'),
      keepExtensions: true
    }
  })
)
// 参数校验
app.use(parameter(app))
// 注册路由
routing(app)

app.listen(3333, () => console.log('server is running at 3333 port'))
