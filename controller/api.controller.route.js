var express = require('express')
var Student = require('../models/student.model.js')

module.exports.index = async (req, res)=>{
	var page = parseInt(req.query.page)
	var result = await Student.find().lean()
	var start
	if(page == 0){
		start = 0
	}else{
		start = page * 16 - 1
	}
	var end =  start + 16
	var arrValue = result.slice(start, end)
	var check = ''
	for(let i of arrValue){
		i.birthday = i.birthday.replace("/", "-")
		i.birthday = i.birthday.replace("/", "-")
		i.city = i.city.replace("/", "-")
		check += i._id + "/" + i.name + "/" + i.gender + "/" + i.class + "/" + i.phone + "/" + i.email + "/" + i.birthday + "/" + i.city + "/" +			i.identify + "/" + i.room + "/" + i.times + "/"
	}
	var total = Math.ceil(result.length / 16)
	check += total
	res.status(200).send(check)
}

module.exports.sendImage = async (req, res)=>{
	var name = req.query.name
	var link = await Student.findOne({ name : name }).lean()
	res.sendFile(__basedir + '/public/' + link.imageName)
}

module.exports.search = async (req, res)=>{
	var result = []
	if(req.query.name){
		var name = req.query.name
		console.log(name)
		result = await Student.find({ name: name }).lean()
	}
	if(req.query.class){
		var classNo = req.query.class
		result = await Student.find({ class: classNo }).lean()
	}
	if(req.query.id){
		var id = req.query.id
		console.log(id)
		var obj = await Student.findById(id).lean()
		if(obj != null){ result[0] = obj }
	}
	if(Array.isArray(result) && result.length){ 
		var check = ''
		for(let i of result){
			i.birthday = i.birthday.replace("/", "-")
			i.birthday = i.birthday.replace("/", "-")
			i.city = i.city.replace("/", "-")
			check += i._id + "/" + i.name + "/" + i.gender + "/" + i.class + "/" + i.phone + "/" + i.email + "/" + i.birthday + "/" + i.city + "/" +
				i.identify + "/" + i.room + "/" + i.times + "/"
		}
	check += result.length
	res.status(200).send(check)
	}else{
		res.status(404).send('Resource does not exits!');
	}
}

module.exports.createNew = (req, res)=>{
	req.body.avatar = req.file.filename
	Student.insertMany({
		name : req.body.name,
		gender : req.body.gender,
		phone : req.body.phone,
		email : req.body.email,
		birthday : req.body.birthday,
		city : req.body.city,
		class : req.body.class,
		identify : req.body.identify,
		room : req.body.room,
		times : req.body.times,
		imageName : req.body.avatar
	}, function(err, result){
			if(err){
				res.status(404).end()
				return;
			}
			else{
				res.status(200).send('Create new student successfully')
			}
		});
};

module.exports.execPut = (req, res)=>{
	var id = req.params.id
	Student.findByIdAndUpdate(id,  
		{ name: req.body.name ,
		 gender: req.body.gender,
		 phone: req.body.phone ,
		 email: req.body.email ,
		 city: req.body.city ,
		 identify: req.body.identify ,
		 class: req.body.class ,
		 room: req.body.room ,
		 times: req.body.times ,
		 birthday: req.body.birthday}
		, 
		{upsert: true}, 
		err=>{
			if(!err){
				res.status(200).send('Update successfully!')
			}else{
				res.status(500).send('Update unsuccessfully!')
			}
		})
}

module.exports.execDel = async (req, res)=>{
	var id = req.params.id
	Student.findByIdAndRemove({ _id: id}, err=>{
		if(!err){
			res.status(200).send('Delete scucessfully!')
		}
		else{
			res.status(404).send('Resource does not exits!')
		}
	})
}