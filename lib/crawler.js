const request = require('request');
const cheerio = require('cheerio');
const phantom = require("phantom");

const properties  = require('../config/properties');

const parser = require('./parser.js');

function run(req, res) {
  request.post({
    url:'https://moodle.ut.ee/login/index.php',
    form: {
      username: req.body.username,
      password: req.body.password
    }
  }, (err, resp, body) => {

    if (err) return sendUnexpectedError(res);
    
    cookie = getCookie(resp.headers);
    
    request.get({
      url:'https://moodle.ut.ee/my/',
      headers: {
        'Cookie': cookie
      }
    }, (err, resp, body) => {

      if (err) return sendUnexpectedError(res);

      if (!isLoggedIn(body)) {
        return sendLoginError(res);
      } else {
        sendLoginSuccessful(res);
      }

      getCourseLinks(body, (courseLink) => {  

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

          getQuizLinks(body, (quizLink) => {

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

              getQuizReviewLinks(body, (quizReviewLink) => {

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
                  
                  if (hasToBeRendered(body)) {
                    renderPage(quizReviewLink, cookie, (body) => {
                      parse(body, function() {
                        console.log('Rendered ' + quizReviewLink);
                      });
                    });
                  } else {
                    parse(body, function() {
                      console.log(quizReviewLink);
                    });
                  };
                });
              });
            });
          });
        });
      });
    });
  });
};


function isLoggedIn(body) {
  let $ = cheerio.load(body);
  let loginButtonClass = $('.logininfo a').first().attr('class');

  return loginButtonClass != "login-button";
};


function getCookie(headers) {
  let cookie;
  let rawCookies = headers['set-cookie'];

  rawCookies.forEach((rawCookie) => {
    if (rawCookie.startsWith("MoodleSessionMDL3")) {
      cookie = rawCookie;
    };
  });
  
  return cookie;
};


function getCourseLinks(body, callback) {
  let $ = cheerio.load(body);
  let courses = $('nav .dropdown ul').last().children();          // Gets all courses from last navigation dropbown list

  courses.each(function() {
    callback(
      $(this).children().first().attr('href')                     // Gets href from <a> element inside the <ul> element
      .replace("/course/view.php", "/mod/quiz/index.php")
    );
  });
};


function getQuizLinks(body, callback) {
  let $ = cheerio.load(body);
  let quizes = $('.generaltable tbody tr td a');                  // Gets quizes <a> elements from '/mod/quiz/index.php'

  quizes.each(function() {
    callback("https://moodle.ut.ee/mod/quiz/" + $(this).attr('href'));
  });
};


function getQuizReviewLinks(body, callback) {
  let $ = cheerio.load(body);
  let attempts = $('.generaltable tbody tr td a');

  attempts.each(function() {
    callback($(this).attr('href') + "&showall=1");
  });
};


function hasToBeRendered(body) {
  //TODO

  return true;
};


function parse(body, callback) {
  callback(parser.parseHtml(body));
};


function sendUnexpectedError(res) {
  res.status(500).json({success: false, msg:'There was an unexpected error'});
};

function sendLoginError(res) {
  res.status(401).json({success: false, msg:'Login failed'});
};

function sendLoginSuccessful(res) {
  res.send({success: true, msg: 'Login OK'});
}


function renderPage(url, cookie, callback) {
  let _page;
  phantom.create().then((ph) => {
    return ph.createPage();
  }).then((page) => {
    _page = page;
    
    var settings = {
      headers: {
      "Cookie": cookie
      }
    };

    return _page.open(url, settings);
  }).then((status) => {
    if (status != 'success') console.log('Error rendering ' + url);
    return _page.property('content')
  }).then((content) => {
    callback(content);
    _page.close();
  }).catch((err) => console.log(err));
};
  

module.exports.run = run;