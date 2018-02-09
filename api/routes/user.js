const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup =  (req, res, next) => {
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if(user){
                return res.status(409).json({
                    message: 'eMail exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            email: req.body.email,
                            hash_password: hash,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname
                            });
                            user
                                .save()
                                .then(result => {
                                    const token = jwt.sign({
                                        email: result.email,
                                        userId: result._id
                                    },
                                    process.env.JWT_KEY,
                                    {
                                        expiresIn: '7d'
                                    });
                                    return res.status(201).json({
                                        message: 'User created',
                                        token: token
                                    });
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        error: err
                                    });
                                });
                        }
                    });   
            }            
        });
};

exports.login = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length < 1){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].hash_password, (err, result) => {
                if(err){
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if(result){
                    //--token 
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '7d'
                    });
                    return res.status(201).json({
                        message: 'Auth Successful',
                        user: result,
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};

exports.updateAccount = (req, res, next) => {
    
};

exports.deleteAccount = (req, res, next) => {
    
};
