const express = require('express');
const router = express.Router();
const properties  = require('../config/properties');

const request = require('request');
const cheerio = require('cheerio');
var phantom = require("phantom");

router.post('/', (req, res, next) => { 

  request.post({
    url:'https://moodle.ut.ee/login/index.php', 
    form: { 
      username: properties.moodle.username, 
      password: properties.moodle.password 
    } 
  }, (err, res, body) => {

    cookie = getCookie(res.headers);

    request.get({
      url:'https://moodle.ut.ee/my/', 
      headers: {
        'Cookie': cookie
      }
    }, (err, res, body) => {

      getCourseLinks(body, (courseLinks) => {       
        courseLinks.forEach((courseLink) => {
          renderPage(courseLink, cookie);
        });
      });
    });
  });


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
    let courseLinks = [];
    let $ = cheerio.load(body);
    let courses = $('nav .dropdown ul').last().children();        // Gets all courses from last navigation dropbown list

    courses.each(function() {
      courseLinks.push(
        $(this).children().first().attr('href')                   // Gets href from <a> element inside the <ul> element
        .replace("/course/view.php", "/mod/quiz/index.php")
      );
    });

    callback(courseLinks);
  };


  function renderPage(courseLink, cookie) {
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

          return _page.open(courseLink, settings);
      }).then((status) => {
          console.log(status);
          return _page.property('content')
      }).then((content) => {
          console.log("==========================================================================================")
          console.log(content);
          _page.close();
      }).catch(e => console.log(e));
  };

});

module.exports = router;