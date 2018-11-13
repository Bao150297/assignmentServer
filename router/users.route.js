var express = require('express')
var router = express.Router()
var shortid = require('shortid') 
var controller = require('../controller/users.controller.js')
var valid = require('../validate/validate.create.js')
var cookieParser = require('cookie-parser')
router.use(cookieParser())
var authMiddleware = require('../middleware/auth.middleware.js')

router.get('/'/*, authMiddleware.requireAuth*/, controller.index)

router.get('/search', controller.search)

router.get('/create', controller.getCreate)

router.post('/create', controller.create)

router.get('/show', controller.getPage)
//router.get('/:id', controller.getID)

module.exports = router