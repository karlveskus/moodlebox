var express = require('express');
var router = express.Router();

const users = require('./users');
const feedback = require('./feedback');

router.use('/users', users);
router.use('/feedback', feedback);

module.exports = router;
