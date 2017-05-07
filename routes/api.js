const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const fs = require('fs-promise');

const parser = require('../lib/parser.js');
const crawler = require('../lib/crawler.js');

const users = require('./users');
const feedbacks = require('./feedbacks');

router.use('/users', users);
router.use('/feedbacks', feedbacks);

// This route is just for testing
router.get('/parser', (req, res, next) => {
    fs.readFile('./lib/testHtml.html').then((sisu)=>{
        res.send(parser.parseHtml(sisu));
    });
});

router.post('/crawler', (req, res) => { 
  crawler.run(req, res);
});

module.exports.router = router;