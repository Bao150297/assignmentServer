var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId

var userSchema = new mongoose.Schema({
	_id: ObjectId,
	name: String,
	password: String
})

var User = mongoose.model('User', userSchema, 'users')

module.exports = User