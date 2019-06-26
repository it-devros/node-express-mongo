const mongoose = require('../libs/mongoose')
const HashPass = require('../libs/HashPass')

let Schema = mongoose.Schema

let schema = new Schema({
  user_ID : {
    type : String,
    required : false
   },
  sensors : {
    type : Array,
    required : false
   },
  weight_scale : {
    type : Object,
    required : false
  },
  blood_pressure : {
    type : Array,
    required : false
  },
  thermometer : {
    type : Object,
    required : false
  },
  activity_amount : {
    type : Object,
    required : false
  },
  sleep : {
    type : Object,
    required : false
  },
  motion : {
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


module.exports = mongoose.model('Target', schema)