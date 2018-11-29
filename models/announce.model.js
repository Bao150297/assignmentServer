const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

var announceSchema = new mongoose.Schema({
	_id: ObjectId,
	title: String,
	content: String,
	makerID: String
})

var Announce = mongoose.model('Announce', announceSchema, 'announcement')

module.exports = Announce