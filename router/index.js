module.exports = function(app) {
  const auth = require('./auth')
  const data = require('./data')

  app.use('/api/auth', auth)
  app.use('/api/data', data)
}