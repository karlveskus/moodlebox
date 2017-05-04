const express = require('express');
const router = express.Router();
const parser = require('../lib/parser.js');
const cheerio = require('cheerio');
const fs = require('fs-promise');

const users = require('./users');
const feedbacks = require('./feedbacks');
const crawler = require('./crawler');

router.use('/users', users);
router.use('/feedbacks', feedbacks);
router.use('/crawler', crawler);

// This route is just for testing
router.get('/parser', (req, res, next) => {
    fs.readFile('./lib/testHtml.html').then((sisu)=>{
        res.send(parser.parseHtml(sisu));
    });
});

module.exports.router = router;