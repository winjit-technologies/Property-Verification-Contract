var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cors = require("cors");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var compression = require("compression");
var bodyParser = require('body-parser');
var blockchainRouter = require('./modules/blockchain/blockchainRouter');

var config = require('./config/config');
var mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var helmet = require('helmet');
var fs = require('fs')
var session = require('express-session')
var RateLimit = require('express-rate-limit');
app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc) 

var limiter = new RateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes 
	max: 100, // limit each IP to 100 requests per windowMs 
	delayMs: 0, // disable delaying - full speed until the max limit is reached 
	message: "You've made too many requests recently. Please wait and try your request again later. "
});

//  apply to all requests 
app.use(limiter);

app.set('trust proxy', 1) // trust first proxy

app.use(session({
	secret: 'l@andL@y8yAp!',
	resave: false,
	saveUninitialized: true,
cookie: { secure: true }
}))

app.use(helmet());
app.use(cors());
app.use('/propertyverification/blockchainapi/', blockchainRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
