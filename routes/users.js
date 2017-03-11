var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');  // Ülidest jwt peaks kõige levinum ja turvalisem olema.

router.get('/', function(req, res, next) {
  res.send("Users endpoint")
});

module.exports = router;

function ifUserLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}