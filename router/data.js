const express = require('express')
const router = express.Router()

const isAuth = require('../middleware/isAuth')
let dataController = require('../controllers/dataController')

const runAction =  (action, req, res) => {
	action(req, res)
		.then((data) => {
			res.status(200).send(data)
			return
		})
		.catch((err) => {
			res.status(err.status || 400).send({ message: err.message})
			return
		})
}

router.get('/', (req, res) => {
	res.json({status: '/data is running healthy.'})
})

router.get('/sensor', (req, res) => runAction(dataController.getSensors, req, res))
router.post('/sensor', (req, res) => runAction(dataController.saveSensorAction, req, res))
router.delete('/sensor/:_id', (req, res) => runAction(dataController.deleteSensorAction, req, res))

router.get('/target', (req, res) => runAction(dataController.getTargets, req, res))
router.post('/target', (req, res) => runAction(dataController.saveTargetAction, req, res))
router.delete('/target/:_id', (req, res) => runAction(dataController.deleteTargetAction, req, res))


module.exports = router