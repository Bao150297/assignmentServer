module.exports.valid = function(req, res, next){
	if(!req.body.name){
		res.send('<p>Nhap sai rui</p>')
		return
	}
	next()
}