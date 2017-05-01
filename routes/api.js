const express = require('express');
const router = express.Router();
const parser = require('../lib/parser.js');

const users = require('./users');
const feedbacks = require('./feedbacks');

router.use('/users', users);
router.use('/feedbacks', feedbacks);

router.get('/parser', (req, res, next) => {
    parser.parseHtml().then(function(sisu) {
        next();
    });
});


module.exports.router = router;