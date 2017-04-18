const path = require('path');
const jwt = require('jsonwebtoken');
const properties = require('../config/properties');

function authenticateMiddleware(mustBeAdmin) {
  return function (req, res, next) {
    let accessGranted = false;
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, properties.jwt.secret, function(err, decoded) {
        if (err) {
          res.sendFile(path.resolve('public/index.html'));
        }
        else {
          if (mustBeAdmin && decoded.role == 'admin') {
            next();
          } else {
            res.sendFile(path.resolve('public/index.html'));
          }
        }
      });  
    } else {
      res.sendFile(path.resolve('public/index.html'));
    }
  }
}

module.exports.mustBeUser = authenticateMiddleware(false);
module.exports.mustBeAdmin = authenticateMiddleware(true);