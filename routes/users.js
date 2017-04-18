const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../lib/auth.js');


router.get('/count', (req, res) => {
  User.find().count({}, function(err, count) {
    res.json({
      count: count
    });
  });
});

router.get('/', auth.mustBeAdmin, (req, res, next) => {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

module.exports = router;