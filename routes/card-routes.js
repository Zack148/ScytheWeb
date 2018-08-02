var router = require('express').Router();
var Card = require('../models/card-models');
router.use(require('../middleware/canedit'));

router.get('/:id', async function(req, res) {
  if (req.params.id !== 'new') {
    card = await Card.findById(req.params.id).exec()
  } else {
    card = new Card()
    card.save()
  }
  res.render('editcards', {
    title: 'Edit',
    card: card
  });
});

router.post('/update', async function(req, res) {
  var card = await Card.findByIdAndUpdate(req.body.id, {
    $set: {
        title: req.body.title,
        desc: req.body.desc,
        image: req.body.image,
        stocked: req.body.stocked,
        type: req.body.type,
        mostPopular: req.body.mostPopular
      }
  }).exec()
    res.redirect(`/card/${req.body.id}`)
})

module.exports = router;
