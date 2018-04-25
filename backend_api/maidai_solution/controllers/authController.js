const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');

exports.signup = (req, res, next) => {
    Doctor.findOne({ email: req.body.email })
        .exec()
        .then(doctor => {
            if (doctor) {
                return res.status(409).json({
                    message: 'email exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const doctor = new Doctor({
                            email: req.body.email,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            profession: req.body.profession,
                            phonenumber: req.body.phonenumber,
                            address: req.body.address,
                            hash_password: hash,
                        });
                        doctor
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
                                    user: result,
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
    Doctor.find({ email: req.body.email })
        .exec()
        .then(doctor => {
            if (doctor.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed 78'
                });
            }
            bcrypt.compare(req.body.password, doctor[0].hash_password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed 12'
                    });
                }
                if (result) {
                    //--token
                    const token = jwt.sign({
                        email: doctor[0].email,
                        userId: doctor[0]._id
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '7d'
                        });
                    return res.status(201).json({
                        message: 'Auth Successful',
                        user: doctor,
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
