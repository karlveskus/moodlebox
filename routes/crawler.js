const express = require('express');
const router = express.Router();
const properties  = require('../config/properties');

const request = require('request');
const cheerio = require('cheerio');
let Cookie = require('request-cookies').Cookie;

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
        'Cookie': getCookies(res)[1]
      }
    }, (err, res, body) => {

      getCourseLinks(body, (courseLinks) => {
        courseLinks.forEach((courseLink) => {
          console.log(courseLink);
        })
      })
    })
  })

  res.json({ success: true });                                    // TODO: Add error handling

  function getCookies(res) {
    let parsedCookiesList = [];
    let rawCookies = res.headers['set-cookie'];

    rawCookies.forEach((rawCookie) => {
      parsedCookie = new Cookie(rawCookie);
      parsedCookiesList.push(parsedCookie.key + '=' + parsedCookie.value)
    })
    
    return parsedCookiesList;
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