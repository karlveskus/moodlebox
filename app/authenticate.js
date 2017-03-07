"use strict";
var LocalStrategy = require('passport-local').Strategy;
var User = require('user');

module.exports = function(passport) {

    passport.use('local-signup', new LocalStrategy({
        username : 'email',
        password : 'password',
    },
    function(req, email, password, done) {
        //Check if exists.etc 
        //Must implement with callback()
        var newUser            = new User();
        newUser.local.email    = email;
        newUser.local.password = newUser.generateHash(password);
        newUser.saveUser
   

    });

};