const express = require('express');
const router = express.Router();

const crawler = require('../lib/crawler.js');
const request = require('request');

router.post('/', (req, res, next) => { 

  request.post({
    url:'https://moodle.ut.ee/login/index.php',
    form: {
      username: req.body.username,
      password: req.body.password
    }
  }, (err, res, body) => {

    // TODO: Check if login was successful. If not, then stop crawling here
    
    cookie = crawler.getCookie(res.headers);
    
    request.get({
      url:'https://moodle.ut.ee/my/',
      headers: {
        'Cookie': cookie
      }
    }, (err, res, body) => {
      //renderPage('https://moodle.ut.ee/mod/quiz/review.php?attempt=1373878', cookie);
        
      crawler.getCourseLinks(body, (courseLinks) => {       
        courseLinks.forEach((courseLink) => {
          crawler.renderPage(courseLink, cookie);

        });
      });
    });
  });
});

module.exports = router;