const express = require('express');
const router = express.Router();
const properties  = require('../config/properties');
const crawler = require('../lib/crawler')

const request = require('request');
const cheerio = require('cheerio');

var phantom = require("phantom");
var _ph, _page, _outObj;

router.get('/test', (req, res, next) => {
  phantom.create().then(ph => {
        _ph = ph;
        return _ph.createPage();
    }).then(page => {
        _page = page;
        return _page.open('https://moodlebox.us');
    }).then(status => {
        console.log(status);
        return _page.property('content')
    }).then(content => {
        console.log(content);
        _page.close();
        _ph.exit();
    }).catch(e => console.log(e))
})


router.post('/', (req, res, next) => { 

  request.post({
    url:'https://moodle.ut.ee/login/index.php', 
    form: { 
      username: properties.moodle.username, 
      password: properties.moodle.password 
    } 
  }, (err, res, body) => {

    request.get({
      url:'https://moodle.ut.ee/my/', 
      headers: {
        'Cookie': getCookie(res.headers)
      }
    }, (err, res, body) => {

      getCourseLinks(body, (courseLinks) => {
        courseLinks.forEach((courseLink) => {
          console.log(courseLink);
        })
      })
    })
  })


  function getCookie(headers) {
    let cookie;
    let rawCookies = headers['set-cookie'];

    rawCookies.forEach((rawCookie) => {
      if (rawCookie.startsWith("MoodleSessionMDL3")) {
        cookie = rawCookie;
      };
    });
    
    return cookie;
  }

  function getCourseLinks(body, callback) {
    let courseLinks = []
    let $ = cheerio.load(body);
    let courses = $('nav .dropdown ul').last().children();        // Gets all courses from last navigation dropbown list

    courses.each(function() {
      courseLinks.push(
        $(this).children().first().attr('href')                   // Gets href from <a> element inside the <ul> element
        .replace("/course/view.php", "/mod/quiz/index.php")
      )
    })

    callback(courseLinks);
  }

});

module.exports = router;