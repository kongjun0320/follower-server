const mongoose = require('mongoose')

const { connectionStr } = require('../config')

mongoose.connect(connectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', console.log.bind(console, 'connection success:'))