var mongoose = require('mongoose')


var userSchema = new mongoose.Schema({
	_id: {
		type: String
	},
	name: String,
	password: String
})

var User = mongoose.model('User', userSchema, 'users')

module.exports = User