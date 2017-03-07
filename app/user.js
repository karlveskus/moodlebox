
"use strict";
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var saltLength = 2;


var userSchema = mongoose.Schema({
    local : {
        email : String,
        password : String,
    },
    google : {
        id : String,
        token : String,
        email : String,
    }
});

function saveUser(user) {
    
}
function ifUserExists(user) {

}

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltLength), null);
};

userSchema.methods.ifCorrectPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
