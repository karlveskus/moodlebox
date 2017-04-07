const express = require('express');
const router = express.Router();
const properties = require('../config/properties');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const api = require('./api.js');

function mustBeUser(req, res, next) {
  return api.mustBeUser(req, res, next);
}

function mustBeAdmin(req, res, next) {
  return api.mustBeAdmin(req, res, next);
}

router.post('/', (req, res, next) => {
  let newUser = new User({
    email: req.body.email,
    password: req.body.password,
    role: 'user'
  });

  User.findOne({email: newUser.email}, function(err, user) {
    if (err) {
      sendErrorResponse(res);
    } else if (user) {
      sendUserAlreadyExists(res);
    } else {
      User.addUser(newUser, (err) => {
        if(err)
          res.json({success: false, msg:'Failed to register user'});
        else 
          res.json({success: true, msg:'User registered'});
      });
    }
  });

});

router.post('/authenticate', (req, res) => {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) {
      sendErrorResponse(res);
    }
    else if (!user) {
      sendNotFoundResponse(res);
    } else {
      User.comparePassword(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          sendErrorResponse(res);
        } else if (isMatch) {
          let token = jwt.sign({
            email: user.email,
            role: user.role
          }, properties.jwt.secret, {
            expiresIn: 1440 * 7 // 7 days
          });
          sendSuccessResponse(res, token);
        } else {
          sendNotFoundResponse(res);
        }
      });
    }
  });
});

function sendErrorResponse(res) {
  res.status(500).json({success: false, msg:'There was an unexpected error'});
}

function sendNotFoundResponse(res) {
  res.status(402).json({success: false, msg:'No user found with given email and password'});
}

function sendUserAlreadyExists(res) {
  res.status(500).json({success: false, msg:'User already exists'});
}

function sendSuccessResponse(res, token) {
  res.json({
    success: true, 
    msg: "User was found from our database",
    token: token
  });
}

module.exports = router;