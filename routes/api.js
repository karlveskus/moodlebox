const express = require('express');
const router = express.Router();

const user = require('./user');
const users = require('./users');
const feedback = require('./feedback');
const feedbacks = require('./feedbacks');

router.use('/user', user);
router.use('/users', users);
router.use('/feedback', feedback);
router.use('/feedbacks', feedbacks);


module.exports.router = router;