const express = require('express');
const router = express.Router();
const Topic = require('../models/topic');

router.get('/', (req, res, next) => {
    Topic.find()
        .exec()
        .then(topics => {
            res.status(201).json(topics);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/:topicId', (req, res, next) => {
    Topic.findById(req.params.topicId, (err, topic) => {
        if (err) {
            res.status(500).json(err);
        }
        if (topic) {
            res.status(201).json(topic);
        }
        else {
            res.status(404).json({
                message: 'Not Found'
            });
        }
    })
});

router.post('/', (req, res, next) => {
    const topic = new Topic(req.body);
    topic.save((err, topic) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(201).json(topic);
    })
});

router.put('/:topicId', (req, res, next) => {
    Topic.findOneAndUpdate(
        { _id: req.params.topicId },
        req.body,
        { new: true },
        (err, topic) => {
            if (err) {
                res.status(500).send(err);
            }
            if (topic) {
                res.status(201).json(topic);
            }
            else {
                res.status(404).json({
                    message: 'Not Found'
                });
            }
        }
    );
});

router.delete('/:topicId', (req, res, next) => {
    Topic.remove({ _id: req.params.topicId }, (err, topic) => {
        if (err) {
            res.status(500).send(err);
        }
        if (topic) {
            res.status(201).json({
                message: 'topic deleted'
            });
        }
        else {
            res.status(404).json({
                message: 'Not Found'
            });
        }
    });
});

module.exports = router;