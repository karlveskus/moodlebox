const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Subject = require('../models/subject');
const auth = require('../lib/auth.js');

router.get('/', (req, res) => {
    Subject.find({}, function(err, subjects) {
        res.json(subjects);
    });
});

router.post('/', (req, res) => {
    Subject.findOne({code: req.body.code}).exec().then((subject) => {
        if (subject) {
            sendSubjectAlreadyExists(req, res);
        } else {
            Subject.create(req.body).then((subject) => {
                res.send({
                    success: true,
                    _id: subject._id,
                    code: subject.code});
            }).catch(() => {
                sendErrorResponse(res);
            });
        }
    }).catch(() => {
      sendErrorResponse(res);
    });
});

router.get('/:code', (req, res) => {
    Subject.findOne({code: req.params.code}).exec().then((subject) => {
        if (subject) {
            res.send(subject);
        } else {
            sendSubjectNotFoundResonse(res);
        }
    }).catch((err) => {
        res.send(err);
    });
});

router.get('/:code/tests', (req, res) => {
    Subject.findOne({code: req.params.code}).exec().then((subject) => {
        if (subject) {
            res.send(subject.tests);
        } else {
            sendSubjectNotFoundResonse(res);
        }
    }).catch((err) => {
        res.send(err);
    });
});

function sendErrorResponse(res) {
    res.status(500).json({success: false, msg:'There was an unexpected error'});
}

function sendSubjectNotFoundResonse(res) {
    sendNotFoundResponse(res, "Subject not found");
}

function sendTestNotFoundResonse(res) {
    sendNotFoundResponse(res, "Test not found");
}

function sendNotFoundResponse(res, msg) {
    res.status(401).json({success: false, msg:msg});
}

function sendSubjectAlreadyExists(req, res) {
    res.status(400).json({success: false, msg:'Subject with code ' + req.body.code + ' already exists'});
}


module.exports = router;