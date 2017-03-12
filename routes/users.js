var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  res.send("Users endpoint")
});

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

module.exports = router;

