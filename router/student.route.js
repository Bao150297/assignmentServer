var express = require('express')
var controller = require('../controller/api.controller.route.js')
var router = express.Router()
var multer =  require('multer')
var upload = multer({ dest:'public/upload/'})

router.get('/index', controller.index)

router.get('/image', controller.sendImage)

router.get('/search', controller.search)

router.post('/create', 
	upload.single('avatar'),
	controller.createNew)

router.put('/put/:id', controller.execPut)

router.delete('/delete/:id', controller.execDel)

router.get('/announce', controller.sendAnnounce)

router.get('/announce/:id', controller.sendContent)

router.get('/room', controller.roomStatus)

router.put('/room/register/:room', controller.roomRegister1, controller.roomRegister2, controller.roomRegister3)

module.exports = router