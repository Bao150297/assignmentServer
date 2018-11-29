var User = require('../models/users.model.js')
var md5 = require('md5')
var Student = require('../models/student.model.js')

module.exports.index = (req, res)=>{
	res.sendFile( __basedir +'/public/auth.login.html')
}

module.exports.login = async (req, res, next)=>{
	var name = req.body.name
	var password = req.body.password
	var hashedPassword = md5(password)
	var user = await User.findOne({name : name}).lean()
	if(user){
		if(user.password !== hashedPassword){
			res.status(403)
		}else{
			res.cookie('userID', user._id, {
				signed: true
			})
			res.status(200).send(`${user._id}/${user.name}/user`)
			return
		}
	}
	var student = await Student.findOne({name : name}).lean()
	if(student){
		if(student.identify !== password){
			res.status(403)
			return
		}else{
			res.status(200).send(`${student._id}/${student.name}/student`)	
		}
	}
	res.status(404).end()
}

