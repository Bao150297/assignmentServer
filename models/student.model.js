var mongoose = require('mongoose');

var studentSchema =  new mongoose.Schema({
	_id:{
		type : String
	},
	name: String,
	gender: String,
	phone: String,
	email: String,
	birthday: String,
	city: String,
	class: String,
	indentify: String,
	room: Number,
	times: Number
});

var Student = mongoose.model('Student', studentSchema, 'students')

module.exports = Student;