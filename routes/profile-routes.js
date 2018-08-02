var router = require('express').Router();

var authCheck = (req, res, next) => {
  if(!req.user){
    // if user us not logged in
    res.redirect('/login');
  } else {
    // if logged in
    next();
  }
};

router.get('/', authCheck, (req,res) => {
  res.render('profile', {
    title: 'Profile',
  });
})

module.exports = router;
