const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const properties = require('../config/properties');


const users = require('./users');
const feedback = require('./feedback');


router.use(authenticateMiddleware(false));
router.use('/users', users);
router.use('/feedback', feedback);

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
                    if (mustBeAdmin == decoded.admin) {
                        next();
                    }
                }
            });  
        } else {
            res.sendFile(path.resolve('public/index.html'));
        }
    }
}

module.exports = router;
