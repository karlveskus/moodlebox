const mongoose = require('mongoose');
const config = require('../config');

const FeedbackSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  email: {
    type: String,
    required: [true, 'Email field is required']
  },
  message: {
    type: String,
    required: [true, 'Message field is required']
  }
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
