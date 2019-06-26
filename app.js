
let express = require('express')
let http = require('http')
let bodyParser = require('body-parser')

const fs = require('fs')
const join = require('path').join
const models = join(__dirname, 'models')
const port = process.env.PORT || 8000

let app = express()

app.use(bodyParser.json({limit: '50mb', extended: true}))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name, Authorization')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', true)

  if ('OPTIONS' === req.method) {
    res.sendStatus(200)
  }
  else {
    next()
  }
})

fs.readdirSync(models)
  .filter((file) => ~file.search(/^[^\.].*\.js$/))
  .forEach((file) => {
    require(join(models, file))
  })

app.use(express.static('./upload'))
require('./router/index')(app)


http.createServer(app).listen(port, () => {
  console.log('Runing server on port: ' + port)
})