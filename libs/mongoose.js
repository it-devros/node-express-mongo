let mongoose = require('mongoose')
let config = require('../config')

mongoose.Promise = require('bluebird')
mongoose.connect(config.db, {useNewUrlParser: true}).then((res) => {
  console.log('MongoDB Connected successfully')
}).catch((err) => {
  console.log('MongoDB Connection failed')
  throw err
})

module.exports = mongoose
