var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var indexRouter = require('./routes/index');
//
//var frontEndrouter = require('./routes/front');
var adminRouter = require('./routes/admin');
var homeRouter = require('./routes/home');
var userRouter = require('./routes/user');
var shopRouter = require('./routes/shop');
var flash = require('connect-flash');
var http = require('http');
var minifyHTML = require('express-minify-html');

var cors = require('cors')
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var mysql =require('mysql');
var geturl = require('url');
// view engine setup
const { check, validationResult } = require('express-validator');
var  multer = require('multer');

app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));
app.use(cors());
app.use(session({
    
    secret: 'secret',
	resave: true,
    cookie:{maxAge:null},
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
//app.use('/', indexRouter);
app.use('/adminxp', adminRouter);
app.use('/user',userRouter);
app.use('/shop',shopRouter);
app.use('/',homeRouter);

app.use('/helo', express.static(__dirname + '/helo'));


//app.use('/admin',usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler

http.createServer(function(req,res){
    
    
})
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
