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
  }, (err, resp, body) => {

    if (err) {
      res.status(500).json({success: false, msg:'There was an unexpected error'});
      return;
    }
    
    cookie = crawler.getCookie(resp.headers);
    
    request.get({
      url:'https://moodle.ut.ee/my/',
      headers: {
        'Cookie': cookie
      }
    }, (err, resp, body) => {

      if (!crawler.isLoggedIn(body)) {
        res.status(401).json({success: false, msg:'Login failed'});
        return;
      };
        
      crawler.getCourseLinks(body, (courseLink) => {   

        request.get({
          url:courseLink,
          headers: {
            'Cookie': cookie
          }
        }, (err, resp, body) => {

          crawler.getQuizLinks(body, (quizLink) => {
            console.log(quizLink);
            //crawler.renderPage(courseLink, cookie);
          });
        });
      });
    });
  });
});

module.exports = router;