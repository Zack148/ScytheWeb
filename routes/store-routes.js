var router = require('express').Router();
var Card = require('../models/card-models');


router.get('/', async function(req, res) {
    cards = await Card.find().exec()
  res.render('store', {
    title: 'Store',
    cards: cards
  });
});

module.exports = router;
