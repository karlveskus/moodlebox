const express = require('express');
const router = express.Router();

const crawler = require('../lib/crawler.js');
const parser = require('../lib/parser.js');
const request = require('request');

router.post('/', (req, res, next) => { 

  request.post({
    url:'https://moodle.ut.ee/login/index.php',
    form: {
      username: req.body.username,
      password: req.body.password
    }
  }, (err, resp, body) => {

    if (err) return sendUnexpectedError(res);
    
    cookie = crawler.getCookie(resp.headers);
    
    request.get({
      url:'https://moodle.ut.ee/my/',
      headers: {
        'Cookie': cookie
      }
    }, (err, resp, body) => {

      if (err) return sendUnexpectedError(res);
      if (!crawler.isLoggedIn(body)) return sendLoginError(res);

      crawler.getCourseLinks(body, (courseLink) => {  

        /*
        *   Crawls view that shows all quizes
        *   https://moodle.ut.ee/mod/quiz/index.php?id=2479
        */ 

        request.get({
          url: courseLink,
          headers: {
            'Cookie': cookie
          }
        }, (err, resp, body) => {

          if (err) return sendUnexpectedError(res);

          crawler.getQuizLinks(body, (quizLink) => {

            /*
            *   Crawls view that shows all attemts
            *   https://moodle.ut.ee/mod/quiz/view.php?id=227027
            */

            request.get({
              url: quizLink,
              headers: {
                'Cookie': cookie
              }
            }, (err, resp, body) => {

              if (err) return sendUnexpectedError(res);

              crawler.getQuizReviewLinks(body, (quizReviewLink) => {

                /*
                *   Crawls view that shows the quiz with all questions
                *   https://moodle.ut.ee/mod/quiz/review.php?attempt=1582190&showall=1
                */

                request.get({
                  url: quizReviewLink,
                  headers: {
                    'Cookie': cookie
                  }
                }, (err, resp, body) => {

                  if (err) return sendUnexpectedError(res);
                  
                  parser.parseHtml(body);

                  console.log(quizReviewLink);
                  //crawler.renderPage(quizreviewLink, cookie);
                });
              });
            });
          });
        });
      });
    });
  });
});

function sendUnexpectedError(res) {
  res.status(500).json({success: false, msg:'There was an unexpected error'});
}

function sendLoginError(res) {
  res.status(401).json({success: false, msg:'Login failed'});
}

module.exports = router;