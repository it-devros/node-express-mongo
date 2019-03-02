module.exports = function(app) {
	const auth = require('./auth')

	app.use('/api/auth', auth)
}