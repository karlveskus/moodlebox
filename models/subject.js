const mongoose = require('mongoose');
const config = require('../config');
const Question = require('./question');

const TestSchema = mongoose.Schema({
    name: String,
    questions: [Question.schema]
});

const SubjectSchema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tests: [TestSchema]
},
{
    versionKey: false
});

const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;