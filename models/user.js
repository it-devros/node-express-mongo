const mongoose = require('../libs/mongoose')
const HashPass = require('../libs/HashPass')

let Schema = mongoose.Schema

let schema = new Schema({
	email : {
		 type : String,
		 required : true
	},
	password : {
		 type : String,
		 required : true
	},
	is_admin : {
		type : Boolean,
		required : false,
		default : false
	},
	created_at : {
		type : Date,
		required : false,
		default: new Date()
	},
	updated_at : {
		type : Date,
		required : false,
		default: new Date()
	}

})


schema.pre('save', function (next) {
	if(this.isModified('password')) {
		this.password = HashPass.createHash(this.password)
	}
	this.updated_at = new Date()
	return next()
})


schema.methods.comparePassword = function (password) {
	return HashPass.validateHash(this.password, password)
}


schema.statics.load = function (criteria, select) {
	return this.findOne(criteria).select(select).exec()
}

schema.statics.list = function (options) {
	options = options || {}
	const criteria = options.criteria || {}
	const page = options.page || 0
	const limit = options.limit || {}

	return this.find(criteria).exec()
}


module.exports = mongoose.model('User', schema)