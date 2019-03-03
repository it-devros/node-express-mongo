const mongoose = require('../libs/mongoose')
const HashPass = require('../libs/HashPass')

let Schema = mongoose.Schema

let schema = new Schema({
	name : {
		type : String,
		required : true
 	},
  temperature : {
		type : Object,
		required : false
 	},
  humidity : {
		type : Object,
		required : false
  },
  illuminance : {
		type : Object,
		required : false
  },
  acceleration : {
		type : Object,
		required : false
  },
  odor : {
		type : Object,
		required : false
  },
  noise : {
		type : Object,
		required : false
  },
  atmospheric_pressure : {
		type : Object,
		required : false
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
	this.updated_at = new Date()
	return next()
})


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


module.exports = mongoose.model('Sensor', schema)