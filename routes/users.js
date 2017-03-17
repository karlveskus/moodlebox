const express = require('express');
const router = express.Router();
const config = require('../config/properties');
const User = require('../models/user');

router.post('/', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({success: false, msg: 'User not found'});
    

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            email: user.email
          }
        });
      } else return res.json({success: false, msg: 'Wrong password'});
    });
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