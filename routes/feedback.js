const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

router.post('/', function(req, res, next) {

    let newFeedback = new Feedback({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    Feedback.addFeedback(newFeedback, (err, feedback) => {
        if(err){
            res.json({ success: false, msg: "Failed to add feedback"});
        } else {
            res.json({ success: true, msg: "Feedback added"});
        }
    });
});

module.exports = router;
