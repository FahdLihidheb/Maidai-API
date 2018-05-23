const Doctor = require('../models/doctor');

exports.getDoctors = (req, res, next) => {
    Doctor.find()
        .select('_id firstname lastname profession')
        .exec()
        .then(doctors => {
            res.status(201).json(doctors);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

exports.getDoctorById = (req, res, next) => {
    Doctor.findById(req.params.doctorId)
        .exec()
        .then(doctor => {
            res.status(201).json(doctor);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

exports.getDoctorByToken = (req, res, next) => {
    Doctor.findById(req.userData.userId)
        .exec()
        .then(doctor => {
            res.status(201).json(doctor);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

exports.getDoctorsByProf = (req, res, next) => {
    Doctor.find({ profession: req.params.profession })
        .limit(5)
        .exec()
        .then(doctors => {
            res.status(201).json(doctors);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

exports.updateImage = (userId, imagePath, res) => {
    Doctor.findById(userId)
        .exec()
        .then(doctor => {
            doctor.imagePath = imagePath;
            doctor.save()
                .then(result => {
                    res.status(201).json({
                        err_code: 0,
                        imagePath: imagePath,
                        message: 'update successful'
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        err_code: 1,
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                err_code: 1,
                error: err
            });
        });
}

exports.updatePrivacySettings = (req, res, next) => {
    Doctor.findById(req.body._id)
        .exec()
        .then(doctor => {
            doctor.privacySettings = req.body.privacySettings;
            doctor.save()
                .then(result => {
                    res.status(201).json({
                        message: 'update successful'
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};