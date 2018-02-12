const mongoose = require('mongoose');
const topicSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdOn: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model("Topics", topicSchema);