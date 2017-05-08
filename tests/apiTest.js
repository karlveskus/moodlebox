const request = require('request');
const Feedback = require('../models/feedback');
const properties = require('../config/properties')

testAddFeedback(console.log);
testDeleteFeedback(console.log);

function testAddFeedback(callback) {
    let passedMessage = "testAddFeedback passed!";
    let failedMessage = "testAddFeedback failed!";

    addFeedback((err, res, body) => {

        if (err) return callback(failedMessage);

        let feedbackId = res.body._id;

        getAdminToken((token) => {

            getFeedbacks(token, (err, res, body) => {

                if (err) return callback(failedMessage);

                for (let feedback of JSON.parse(res.body)) {
                    if (feedback._id == feedbackId) {
                        return removeFeedbackById(feedbackId, callback(passedMessage));
                    }
                }
                
                return callback(failedMessage);
            });
        })
    });
}

function testDeleteFeedback(callback) {
    let passedMessage = "testDeleteFeedback passed!";
    let failedMessage = "testDeleteFeedback failed!";

    addFeedback((err, res, body) => {

        if (err) return callback(failedMessage);

        let feedbackId = res.body._id;

        removeFeedbackById(feedbackId, () => {

            getAdminToken((token) => {

                getFeedbacks(token, (err, res, body) => {

                    if (err) return callback(failedMessage);

                    for (let feedback of JSON.parse(res.body)) {
                        if (feedback._id == feedbackId) {
                            return callback(failedMessage);
                        }
                    }
                    
                    return callback(passedMessage);
                }); 
            });
        });
    });
}


function addFeedback(callback) {
    let settings = {
        uri: 'http://localhost:3000/api/feedbacks',
        method: 'POST',
        json: {
            "name": "test",
            "email": "test@test.ee",
            "message": "test"
        }
    };

    request(settings, callback);
}

function getFeedbacks(token, callback) {
    let settings = {
        uri: 'http://localhost:3000/api/feedbacks',
        method: 'GET',
        headers: {
            "x-access-token": token
        }
    };

    request(settings, callback);
}

function getAdminToken(callback) {
    let postSettings = {
        uri: 'http://localhost:3000/api/users/authenticate',
        method: 'POST',
        json: {
            "email": properties.admin.email,
            "password": properties.admin.password
        }
    };

    request(postSettings, (err, res, body) => {
        callback(res.body.token);
    });
}

function removeFeedbackById(feedbackId, callback) {
    getAdminToken((token) => {
        let postSettings = {
            uri: 'http://localhost:3000/api/feedbacks/' + feedbackId,
            method: 'DELETE',
            headers: {
                "x-access-token": token
            }
        };

        request(postSettings, callback);
    });
}