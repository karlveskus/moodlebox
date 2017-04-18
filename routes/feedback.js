const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');
const api = require('./api.js');
const auth = require('../lib/auth.js');


router.post('/', function(req, res, next) {
    Feedback.create(req.body).then(function(feedback) {
        res.send({success: true, _id: feedback._id});
    }).catch(next);
});

router.delete('/:id', auth.mustBeAdmin, function(req, res, next){
    Feedback.findByIdAndRemove({_id: req.params.id}).then(function(feedback){
        res.send({success: true});
    }).catch(next);
});

module.exports = router;
