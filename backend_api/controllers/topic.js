const Topic = require('../models/topic');

exports.getAllTopics = () => {
    Topic.find()
        .exec()
        .then(topics => {
            return topics;
        })
        .catch(err => {
            return err;
        });
};