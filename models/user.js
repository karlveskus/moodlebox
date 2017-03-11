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
});

const User = module.exports = mongoose.model('User', UserSchema);

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
