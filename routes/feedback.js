const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');
const api = require('./api.js');

function mustBeUser(req, res, next) {
  return api.mustBeUser(req, res, next);
}

function mustBeAdmin(req, res, next) {
  return api.mustBeAdmin(req, res, next);
}

router.post('/', function(req, res, next) {
    Feedback.create(req.body).then(function(feedback) {
        res.send({success: true, _id: feedback._id});
    }).catch(next);
});

router.delete('/:id', mustBeAdmin, function(req, res, next){
    Feedback.findByIdAndRemove({_id: req.params.id}).then(function(feedback){
        res.send({success: true});
    }).catch(next);
});

module.exports = router;
