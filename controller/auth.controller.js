var User = require('../models/users.model.js');
var md5 = require('md5');

module.exports.index = (req, res)=>{
	res.sendFile( __basedir +'/public/auth.login.html');
};

function getJedisQuery(name){
   var query = Jedi.find({name:name});
   return query;
}

module.exports.login = async (req, res)=>{
	var name = req.body.name;
	var password = req.body.password;
	var hashedPassword = md5(password);
	var user = await User.findOne({name : name}).lean();
	console.log(req.body);
	if(!user){
		/*res.cookie('error', '403', {maxAge : 3000});
		res.sendFile( __basedir +'/public/auth.login.html');
	return;*/
		res.send('error');
	}
	if(user.password !== hashedPassword){
		/*res.cookie('error', '404', {maxAge : 5000});
		res.sendFile( __basedir +'/public/auth.login.html');*/
		res.send('error');
	return;
	}
	res.cookie('userID', user._id, {
		signed: true
	});
	//res.redirect('/users');
	res.send('OK');
}

