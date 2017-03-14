const mongoose = require('mongoose');
const config = require('../config');

// User Schema
const FeedbackSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

const Feedback = module.exports = mongoose.model('Feedback', FeedbackSchema);

module.exports.addFeedback = function(newFeedback, callback){
    newFeedback.save(callback);
}
