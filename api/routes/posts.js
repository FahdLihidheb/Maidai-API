const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');

router.get('/profile/:userId', (req, res, next) => {
    Post.find({writer: req.params.userId})
        .select('_id title writer createdOn')
        .populate('writer', '_id firstname lastname')
        .exec()
        .then(posts => {
            res.status(201).json(posts);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/topic/:topicId', (req, res, next) => {

});

router.get('/accueil/:userId', (req, res, next) => {

});

router.get('/:postId', (req, res, next) => {
    Post.findById(req.params.postId)
        .exec()
        .then(posts => {
            res.status(201).json(posts);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/', checkAuth, (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        writer: req.body.userId,
        postBody: req.body.postBody,
        topics: req.body.topics
    });
    post
        .save()
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete('/:postId', (req, res, next) => {

});

module.exports = router;