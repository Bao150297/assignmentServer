var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId
mongoose.set('useFindAndModify', false)

var studentSchema =  new mongoose.Schema({
	_id: ObjectId,
	name: String,
	gender: String,
	phone: String,
	email: String,
	birthday: String,
	city: String,
	class: String,
	identify: String,
	room: Number,
	times: Number,
	imageName: String
})

var Student = mongoose.model('Student', studentSchema, 'students')

module.exports = Student