const express = require('express');
const router = express.Router();
const properties  = require('../config/properties');

const request = require('request');
const cheerio = require('cheerio');
let Cookie = require('request-cookies').Cookie;

router.get('/', (req, res, next) => {
  var pageAfterLogin = getPageAfterLogin();
  res.json(pageAfterLogin);

  function getPageAfterLogin() {
    request.post({url:'https://moodle.ut.ee/login/index.php', form: {username: properties.moodle.username, password: properties.moodle.password}}, function(err, res, body) {
      let parsedCookiesList = [];

      let rawCookies = res.headers['set-cookie'];
      for (let i in rawCookies) {
        let cookie = new Cookie(rawCookies[i]);
        parsedCookiesList.push(cookie);
      }

      let parsedCookiesString = parsedCookiesList.map((c) => {
        return c.key + '=' + c.value;
      })

      request.get({url:'https://moodle.ut.ee/my/', headers: {'Cookie': parsedCookiesString[1]}}, function(err, res, body) {
        return body;
      })
    })
  }
});

module.exports = router;