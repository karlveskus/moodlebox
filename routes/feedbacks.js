const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');
const api = require('./api.js');
const auth = require('../lib/auth.js');

router.get('/', auth.mustBeAdmin, (req, res, next) => {
  Feedback.find({}, function(err, feedbacks) {
    res.json(feedbacks);
  });
});

module.exports = router;