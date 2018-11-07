var express = require('express');
var controller = require('../controller/api.controller.route.js');
var router = express.Router();

router.get('/index', controller.index);
//router.get('/search', controller.search);
//router.get('/create', controller.create);
router.get('/image', controller.sendImage);
router.get('/search', controller.search);
router.get('/create', controller.createIndex);
router.post('/create', controller.createNew);

module.exports = router;