var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var publicRoutes = require('./routes/public/publicRoutes');
var privateRoutes = require('./routes/private/privateRoutes');

const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql2');

var usersRouter = require('./routes/users');


var authRouter = require('./routes/auth');

var app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));

const options = {
  host: 'localhost',
  port: 2115,
  user: 'jakub',
  password: 'user',
  database: 'blogAppDataBase'
};
const sessionStore = new MySQLStore(options);


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));

app.use(passport.authenticate('session'));



app.use('/users', usersRouter);


app.use('/', authRouter);
app.use('/',publicRoutes);
app.use('/auth',privateRoutes);

app.use(function(req, res, next) {
  next(createError(404));
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
