const mongoose = require('mongoose');
const FBprofile = mongoose.Schema({
    user_id: {
        id: String
    },
    userData: {
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
        ],
        interrestes: [
            {
                title: String
            }
        ]
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("FBprofile", FBprofile);