var express = require('express');
var controller = require('../controller/auth.controller.js');
var router = express.Router();

router.post('/login', controller.login)

router.get('/login', controller.index);


module.exports =  router;

