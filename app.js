var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//BP Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get('/', function(req, res) {
  res.render('index', {title:'Home'});
});

app.get('/store', function(req, res) {
  res.render('store', {title:'Store'});
});


// Store items

products: [
  {
    id: '1',
    title: 'Spotify Accounts',
    description: 'This is example text change for production.'
  },

  {
    id: '2',
    title: 'NordVPN Accounts',
    description: 'This is example text change for production.'
  }
]
app.listen(3000, function() {
  console.log('Server started on port 3000');
})
