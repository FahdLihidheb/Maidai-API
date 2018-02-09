const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    hash_password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    createdOn: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model("Users", userSchema);