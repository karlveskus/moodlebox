<<<<<<< HEAD
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const config = require('../models/config');
const saltLength = 2;

const UserSchema = mongoose.Schema({
    local : {
        email : String,
        password : String,
    },
    google : {
        id : String,
        token : String,
        email : String,
    }
=======
"use strict";
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/properties');

// User Schema
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
>>>>>>> local registration and log-in backend
});

const User = module.exports = mongoose.model('User', UserSchema);

<<<<<<< HEAD
// Siia võiksid ka kõik sellised expordid tulla. Nt ka getUserByUsername jne.
// Api endpointis saab siis seda User modelit requireda vastavalt.

// module.exports.getUserById = function(id, callback) {
//     User.findById(id, callback); 
// }


module.exports.saveUser = function(user) {
    
}


module.exports.userExists = function(user) {

}

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltLength), null);
};

// Parem järgida boolean funktsiooni nimede puhul syntaxit is..., mitte if...
userSchema.methods.isCorrectPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
=======
module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback){
  const query = {email: email}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
>>>>>>> local registration and log-in backend
