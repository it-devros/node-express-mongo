const config = require('../config')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req,res,next) => {
	let token = req.headers['authorization']
	if(token && (token.indexOf('Bearer') != -1) && (token.split(' ').length>=2)) {
		jwt.verify(token.split(' ')[1], config.secret, function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' })
			} else {
				return User.load({_id: decoded._id}).then(user => {
					req.decoded = user
					next()
				})
			}
		})
	} else {
		return res.status(404).send('User not found')
	}
}