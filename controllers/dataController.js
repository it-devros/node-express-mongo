
const config = require('../config')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const mongoose = require('mongoose')
const Sensor = mongoose.model('Sensor')
const Target = mongoose.model('Target')


class DataController {

	constructor() {

	}

	static getSensors(req) {
		return Sensor.list().then(sensors => {
      return { sensors }
    }).catch(err => {
      throw err
    })
	}

	static saveSensorAction(req) {
		return new Sensor(req.body).save()
	}
	
	static deleteSensorAction(req) {
		return Sensor.load({_id: req.params._id}).then(sensor => {
			return sensor.remove()
		}).catch(err => {
			throw err
		})
	}
  
  static getTargets(req) {
		return Target.list().then(targets => {
      return { targets }
    }).catch(err => {
      throw err
    })
	}

	static saveTargetAction(req) {
		return new Target(req.body).save()
	}

	static deleteTargetAction(req) {
		return Target.load({_id: req.params._id}).then(target => {
			return target.remove()
		}).catch(err => {
			throw err
		})
	}

}

module.exports = DataController