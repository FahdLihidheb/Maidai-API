const mongoose = require('mongoose');
const FBprofile = mongoose.Schema({
    user_fb_id: String,
    userData: {
        first_name: String,
        last_name: String,
        profile_pic: String,
        locale: String,
        gender: String
    },
    preferences: {
        news: {
            sources: [
                {
                    type: String
                }
            ]
        }
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("FBprofile", FBprofile);