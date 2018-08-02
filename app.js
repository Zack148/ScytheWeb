var express = require('express');
var path = require('path');
var mongo = require('mongodb');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var passportSetup = require('./config/passport-setup');
var keys = require('./config/keys');

mongoose.connect(keys.mongodb.db,{ useNewUrlParser: true }, () => {
  console.log('Connected to mongodb');
})

var app = express();

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieSession({
  maxAge: 86400000, //milliseconds
  keys: [keys.session.cookieKey]
}));

app.use(require('body-parser').urlencoded({ extended: true }));

//init passport
app.use(passport.initialize());
app.use(passport.session());


//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.locals.user = req.user
  res.locals.isGuest = !req.isAuthenticated()
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.canEdit = false
  if (req.isAuthenticated()) {
    if (req.user.canEdit) {
      res.locals.canEdit = true
    }
  }
  next()
})

//setup routes
app.use('/profile', require('./routes/profile-routes'));
app.use('/auth', require('./routes/auth-routes'));
app.use('/card', require('./routes/card-routes'));
app.use('/store', require('./routes/store-routes'));



//Routes
app.get('/', function(req, res) {
  res.render('index', {
    title: 'Home'
  });
});


app.get('/faq', function(req, res) {
  res.render('faq', {
    title: 'FAQ'
  });
});

app.get('/login', function(req, res) {
  res.render('login', {
    title: 'Login'});
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

//Start server
app.listen(3000, function() {
  console.log('Server started on port 3000');
})
