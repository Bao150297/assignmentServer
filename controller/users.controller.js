var express = require('express')
var shortid = require('shortid')
var md5 = require('md5')
var User = require('../models/users.model.js')
var Announce = require('../models/announce.model.js')

module.exports.index = async (req, res)=>{
	//res.sendFile(__basedir + '/public/home.users.html')
	var result = await User.find().lean()
	res.send(result)
}

module.exports.getPage = async(req, res)=>{
	var page = req.query.page
	var result = await User.find().lean()
	var resValue = result
	console.log(resValue)
	res.send(resValue)
}

module.exports.search = (req, res)=>{
	var name = req.query.name
	User.find({ name : name }).find((err, result)=>{
		if(err){
			res.send('<p>No result</p>')
			return
		}
		else{
			res.send(result)
			}
		})
}

module.exports.getCreate = (req, res)=>{
	res.sendFile( __basedir +'/public/create.users.html')
}

module.exports.create = (req, res)=>{
	req.body.password = md5(req.body.password)
	User.insertMany({name : req.body.name,
					 password : req.body.password}, 
		function(err, result){
			if(err){
				res.send(err.toString())
				return
			}
			else{
				res.send('OK')
				/*res.send('<script>alert("Added successfully")</script>')*/
			}
		})
} 

module.exports.changePW = (req, res)=>{
	let id = req.params.id
	let password = md5(req.body.newPW)
	let result = User.findById(id).lean()
	console.log(result)
	User.findByIdAndUpdate(id,  
		{ 
			password: password }
		, 
		{upsert: true}, 
		err=>{
			if(!err){
				res.status(200).end()
			}else{
				res.status(500).end()
			}
		})
}

module.exports.createAnnounce = (req, res)=>{
	req.body.annnounce = req.file.filename
	var title = decodeURIComponent(req.body.title)
	title = title.replace(/([+])/g, ' ')
	console.log(req.body)
	Announce.insertMany({
		title: title,
		content: req.file.filename,
		makerID: req.body.makerID
	}, function(err, result){
			if(err){
				res.status(500).end()
				return;
			}
			else{
				res.status(200).end()
			}
	});
}	