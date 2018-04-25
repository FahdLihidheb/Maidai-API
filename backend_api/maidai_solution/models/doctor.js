const mongoose = require('mongoose');
const docotrSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
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
    profession: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    hash_password: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model("Doctors", docotrSchema);