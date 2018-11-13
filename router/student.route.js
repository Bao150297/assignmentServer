var express = require('express')
var controller = require('../controller/api.controller.route.js')
var router = express.Router()
var multer =  require('multer')
var upload = multer({ dest:'public/'})

router.get('/index', controller.index)
//router.get('/search', controller.search)
//router.get('/create', controller.create)
router.get('/image', controller.sendImage)
router.get('/search', controller.search)
router.get('/create', controller.createIndex)
router.post('/create', 
	upload.single('avatar'),
	controller.createNew)
router.get('/check', controller.checkIndex)
router.post('/check', upload.single('avatar'), controller.check)
module.exports = router