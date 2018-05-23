const mongoose = require('mongoose');
const docotrSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
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
    profession: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true
    },
    address: {
        type: {
            name: String,
            lat: Number,
            lng: Number,
        },
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    imagePath: {
        type: String,
    },
    privacySettings: {
        type:{
            isEmail: Boolean,
            isPhonenumber: Boolean
        },
        default: {
            isEmail: true,
            isPhonenumber: true
        }
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