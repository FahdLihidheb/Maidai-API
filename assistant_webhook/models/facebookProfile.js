const mongoose = require('mongoose');
const FBprofile = mongoose.Schema({
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { strict: false });

module.exports = mongoose.model("FBprofile", FBprofile);