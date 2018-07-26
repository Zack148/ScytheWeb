var express = require('express');
var path = require('path');
var mongo = require('mongodb');
var passport = require('passport');
var mongoose = require('mongoose');
var cookieSession = require('cookie-session');
var passportSetup = require('./config/passport-setup');
var cards = require('./config/cards-setup');
var keys = require('./config/keys');
var profileRoutes = require('./routes/profile-routes');
var authRoutes = require('./routes/auth-routes');

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

//init passport
app.use(passport.initialize());
app.use(passport.session());


//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));



//setup routes
app.use('/profile', profileRoutes);
app.use('/auth', authRoutes);



//Routes
app.get('/', function(req, res) {
  res.render('index', {
    user: req.user,
    title: 'Home'
  });
});

app.get('/login', function(req, res) {
  res.render('login', {
    user: req.user,
    title: 'Login'});
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/store', function(req, res) {
  res.render('store', {
    user: req.user,
    title: 'Store',
    cards: cards
  });
});

//Start server
app.listen(3000, function() {
  console.log('Server started on port 3000');
})
