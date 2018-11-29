var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId
mongoose.set('useFindAndModify', false)

var roomSchema = new mongoose.Schema({
	_id: ObjectId,
	roomID: Number,
	status: String,
	members: Number
})

var Room = mongoose.model('Room', roomSchema, 'room')

module.exports = Room