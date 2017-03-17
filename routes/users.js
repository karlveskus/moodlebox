const express = require('express');
const router = express.Router();
const config = require('../config/properties');
const User = require('../models/user');

router.get('/', (req, res) => {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

router.post('/authenticate', (req, res) => {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) {
      res.json({success: false, msg:'There was an unexpected error'});
    }

    if (!user) {
      res.json({success: false, msg:'No user found with given email and password'});
    } else {
      User.comparePassword(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          res.json({success: false, msg:'There was an unexpected error'});
        } else if (isMatch) {
          res.json({success: true, msg: "User was found from our database"});
        } else {
          res.json({success: false, msg:'No user found with given email and password'});
        }
      });
    }
  });
});

router.post('/register', (req, res, next) => {
  let newUser = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.addUser(newUser, (err) => {
    if(err)
      res.json({success: false, msg:'Failed to register user'});
    else 
      res.json({success: true, msg:'User registered'});
  });
});

module.exports = router;