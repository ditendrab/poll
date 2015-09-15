var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy

var routes = require('./routes/index');
var home = require('./routes/home');
var login = require('./routes/login');
var users = require('./routes/users');
var mongoose = require('mongoose/');

mongoose.connect('mongodb://localhost:27017/mydb');
var Schema = mongoose.Schema;
var UserDetail = new Schema({ 
      name: String,
      password: String
    }, {
      collection: 'users'
    });

var userDetails = mongoose.model('users', UserDetail);

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

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/login', login);
app.use('/home', home);
app.use('/users', users);

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/loginFailure'
  })
);
app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    userDetails.findOne({
      'name':username, 
    }, function(err, user) {
       console.log("user=",user)
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }


      if (user.password != password) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
}));

app.listen(8181);
module.exports = app;
