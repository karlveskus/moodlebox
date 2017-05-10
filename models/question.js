const mongoose = require('mongoose');
const config = require('../config');


const QuestionSchema = mongoose.Schema({
    id: String,
    info: {
        grade: String,
        correctnessType: String,
        feedbackType: String,
        type: {type: String}
    }
},{ _id: false });



const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;