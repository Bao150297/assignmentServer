var User = require('../models/users.model.js')
var md5 = require('md5')

module.exports.index = (req, res)=>{
	res.sendFile( __basedir +'/public/auth.login.html')
}

module.exports.login = async (req, res)=>{
	var name = req.body.name
	var password = req.body.password
	var hashedPassword = md5(password)
	var user = await User.findOne({name : name}).lean()
	console.log(req.body)
	if(!user){
		res.status(403).end()
	}
	if(user.password !== hashedPassword){
		res.status(403).end()
	return
	}
	res.cookie('userID', user._id, {
		signed: true
	})
	res.status(200).send(user.name)
}

