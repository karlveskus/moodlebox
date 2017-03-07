var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send("Users endpoint")
});

module.exports = router;

function ifUserLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}