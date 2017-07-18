var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var user = require('./route/user.js');
var admin = require('./route/admin.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var router = express.Router();
var app = express();

app.set('port', process.env.PORT || 3000);


app.use(logger('dev'));
app.use(methodOverride());

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'uwotm8'
}));
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/user', user);
//app.use('/admin', admin);

app.listen(app.get('port'), () => {
    console.log('listen at http://localhost:3000');
});
