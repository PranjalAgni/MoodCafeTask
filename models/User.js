const mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true        
    },

    name: {
        type: String,
        unique: false,
        required: true,
        trim: true
    }
});

var User = mongoose.model('User' , UserSchema);
module.exports = User;