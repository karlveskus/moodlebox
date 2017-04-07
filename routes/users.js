const express = require('express');
const router = express.Router();
const User = require('../models/user');
const api = require('./api.js');

function mustBeUser(req, res, next) {
  return api.mustBeUser(req, res, next);
}

function mustBeAdmin(req, res, next) {
  return api.mustBeAdmin(req, res, next);
}

router.get('/', mustBeAdmin, (req, res, next) => {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

module.exports = router;