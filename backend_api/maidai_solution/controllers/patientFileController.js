const PatientFile = require('../models/patientFile');

exports.getPatientFilesByDoctor = (req, res, next) => {
    PatientFile.find({
            createdBy: req.userData.userId
        })
        .sort('-createdOn')
        // .populate({
        //     path: 'appointments',
        //     select: 'cause notes analyzeFile dueDate createdOn',
        //     options: {
        //         sort: {
        //             createdOn: -1
        //         }
        //     }
        // })
        .exec()
        .then(patientFiles => {
            res.status(201).json(patientFiles);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

exports.getPatientFileById = (req, res, next) => {
    PatientFile.findById(req.params.patientFileId)
        // .populate({
        //     path: 'appointments',
        //     select: 'cause notes analyzeFile dueDate createdOn',
        //     options: {
        //         sort: {
        //             createdOn: -1
        //         }
        //     }
        // })
        .exec()
        .then(patientFile => {
            res.status(201).json(patientFile);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

exports.addPatientFile = (req, res, next) => {
    const patientFile = new PatientFile({
        patient: req.body.patient,
        note: req.body.note,
        createdBy: req.userData.userId
    });
    patientFile.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};