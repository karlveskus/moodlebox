const express = require('express');
const router = express.Router();

const users = require('./users');
const feedbacks = require('./feedbacks');

router.use('/users', users);
router.use('/feedbacks', feedbacks);


module.exports.router = router;