const request = require('request');
const cheerio = require('cheerio');
const phantom = require("phantom");

const properties  = require('../config/properties');

module.exports = {

  isLoggedIn: function(body) {
    let $ = cheerio.load(body);
    let loginButtonClass = $('.logininfo a').first().attr('class');

    return loginButtonClass != "login-button";
  },


  getCookie: function(headers) {
    let cookie;
    let rawCookies = headers['set-cookie'];

    rawCookies.forEach((rawCookie) => {
      if (rawCookie.startsWith("MoodleSessionMDL3")) {
        cookie = rawCookie;
      };
    });
    
    return cookie;
  },


  getCourseLinks: function(body, callback) {
    let $ = cheerio.load(body);
    let courses = $('nav .dropdown ul').last().children();          // Gets all courses from last navigation dropbown list

    courses.each(function() {
      callback(
        $(this).children().first().attr('href')                     // Gets href from <a> element inside the <ul> element
        .replace("/course/view.php", "/mod/quiz/index.php")
      );
    });
  },


  getQuizLinks: function(body, callback) {
    let $ = cheerio.load(body);
    let quizes = $('.generaltable tbody tr td a');                  // Gets quizes <a> elements from '/mod/quiz/index.php'

    quizes.each(function() {
      callback("https://moodle.ut.ee/mod/quiz/" + $(this).attr('href'))
    });
  },


  renderPage: function(courseLink, cookie) {
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
  }
  
};