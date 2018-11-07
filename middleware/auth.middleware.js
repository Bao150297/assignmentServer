var User = require('../models/users.model.js');

module.exports.requireAuth = (req, res, next)=>{
	if(!req.signedCookies.userID){
		res.redirect('auth/login');
		return;
	}
	var cookieID = req.signedCookies.userID;
	var result = User.find({ _id : req.signedCookies.userID});
	if(!result){
		res.redirect('auth/login');
		return;	
	}
	next();
};	