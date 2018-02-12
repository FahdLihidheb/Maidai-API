const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    topics:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Topics' 
            }
    ],
    writer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    postBody: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model("Posts", postSchema);