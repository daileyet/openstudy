var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret : 'app',
	cookie : {
		maxAge : 60000
	}
}));

var verifyUser = function(req, res, next) {
	if (req.session.loggedIn) {
		next();
	} else {
		var username = "admin", password = "admin";
		if (req.body.username === username && req.body.password === password) {
			req.session.loggedIn = true;
			//res.redirect('/');
			res.render('index', { title: 'Express' });
		} else {
			res.render("login", {
				title : "Please log in."
			});
		}
	}
}
app.use(bodyParser());
app.use('/', verifyUser, routes);
app.use('/users', users);

var getUser = function(req, res, next) {
	var userId = req.params.id;
	var actionToPerform = req.params.action;
	res.send("User (" + userId + "): " + actionToPerform)
}
app.get('/user/:id/profile/:action', getUser);

var getUser = function(req, res, next) {
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	res.send("User: " + query.action);
}
app.get('/user', getUser);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message : err.message,
		error : {}
	});
});

module.exports = app;
