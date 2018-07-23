var router = require('express').Router();
var passport = require('passport');

//auth with google
router.get('/google', passport.authenticate('google', {scope: ['profile']}));

//callback route for google
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  //res.send(req.user)
  res.redirect('/profile');
})

//auth with twitter
router.get('/twitter',
  passport.authenticate('twitter'));

//callback route for twitter
router.get('/twitter/redirect',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

module.exports = router;
