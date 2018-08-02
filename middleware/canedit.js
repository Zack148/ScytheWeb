var router = require('express').Router();

router.use( (req, res, next) => {
    if (res.locals.canEdit) {
      next()
    } else {
      res.status(404).send("Sorry can't find that!")
    }
})

module.exports = router;
