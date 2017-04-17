const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');
const api = require('./api.js');

function mustBeAdmin(req, res, next) {
  return api.mustBeAdmin(req, res, next);
}

router.get('/', mustBeAdmin, (req, res, next) => {
  Feedback.find({}, function(err, feedbacks) {
    res.json(feedbacks);
  });
});

module.exports = router;