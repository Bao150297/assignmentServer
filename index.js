var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3000;
var md5 = require('md5');
var cookieParser = require('cookie-parser');
require('dotenv').config();
var mongoose = require('mongoose');

mongoose.connect("mongodb://tester:tester123@localhost:27017/express-demo", { useNewUrlParser: true });
 
var usersRoute = require('./router/users.route.js');
var authRoute = require('./router/auth.route.js');
var apiRoute = require('./router/student.route.js');
var authMiddleware = require('./middleware/auth.middleware.js');
 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
global.__basedir = __dirname;
app.use(cookieParser(process.env.SEC_COOKIE));

app.get('/', (req, res)=>{
	//res.sendFile('public/auth.login.html' , { root : __dirname});
	res.send('Hello <a href="/users">User List</a>');
})

app.listen(port, ()=>{
	console.log('Server listening on port ' + port);
});

app.use('/api', apiRoute);
app.use('/users', usersRoute);
app.use('/auth', authRoute);