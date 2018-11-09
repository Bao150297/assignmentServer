var express = require('express');
var Student = require('../models/student.model.js');

module.exports.index = async (req, res)=>{
	var page = parseInt(req.query.page);
	var result = await Student.find().lean();
	var start;
	if(page == 0){
		start = 0;
	}else{
		start = page * 16 - 1;
	}
	var end =  start + 16;
	var arrValue = result.slice(start, end);
	var check = '';
	for(let i of arrValue){
		i.birthday = i.birthday.replace("/", "-");
		i.birthday = i.birthday.replace("/", "-");
		i.city = i.city.replace("/", "-");
		check += i._id + "/" + i.name + "/" + i.gender + "/" + i.class + "/" + i.phone + "/" + i.email + "/" + i.birthday + "/" + i.city + "/" +			i.identify + "/" + i.room + "/" + i.times + "/";
	}
	var total = Math.ceil(result.length / 16);
	check += total;
	res.send(check); 
}

module.exports.sendImage = async (req, res)=>{
	var name = req.query.name;
	var link = await Student.findOne({ name : name }).lean();
	res.sendFile(__basedir + '/public/' + link.imageName);
}

module.exports.search = async (req, res, next)=>{
	var result;
	if(req.query.name){
		var name = req.query.name;
		result = await Student.find({ name: name }).lean();
		if(!result){ 
			res.send('error'); 
			next();
		}
	}
	if(req.query.class){
		var classNo = req.query.class;
		result = await Student.find({ class: classNo }).lean();
		if(!result){ 
			res.send('error'); 
			next();
		}
	}
	var check = '';
	for(let i of result){
		i.birthday = i.birthday.replace("/", "-");
		i.birthday = i.birthday.replace("/", "-");
		i.city = i.city.replace("/", "-");
		check += i._id + "/" + i.name + "/" + i.gender + "/" + i.class + "/" + i.phone + "/" + i.email + "/" + i.birthday + "/" + i.city + "/" +
			i.identify + "/" + i.room + "/" + i.times + "/";
	};
	check += result.length;
	res.send(check);
}

module.exports.createIndex = (req, res)=>{
	res.sendFile(__basedir + '/public/api.create.html');
}

module.exports.createNew = (req, res)=>{
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
		times : req.body.times
	}, function(err, result){
			if(err){
				res.send(err.toString());
				return;
			}
			else{
				res.send('OK');
				/*res.send('<script>alert("Added successfully")</script>');*/
			}
		});
}
