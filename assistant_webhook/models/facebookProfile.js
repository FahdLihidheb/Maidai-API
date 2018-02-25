const mongoose = require('mongoose');
const FBprofile = mongoose.Schema({
    userData: {
        user_id: {
            type: String
        },
        first_name: {
            type: String
        },
        last_name: {
            type: String
        }
    },
    preferences: {
        defaultLanguage: {
            type: String,
            default: "en"
        },
        NewsSources: [
            {
                source: String
            }
        ]
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("FBprofile", FBprofile);