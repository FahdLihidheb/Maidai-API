const PatientFile = require('../models/patientFile');

exports.getPatientFilesByDoctor = (req, res, next) => {
    PatientFile.find({
            createdBy: req.userData.userId
        })
        .sort('-createdOn')
        .populate('patient')
        .populate({
            path: 'appointments',
            select: 'cause notes analyzeFile dueDate createdOn',
            options: {
                sort: {
                    createdOn: -1
                }
            }
        })
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
        .populate('patient')
        .populate({
            path: 'appointments',
            select: 'cause notes analyzeFile dueDate createdOn',
            options: {
                sort: {
                    createdOn: -1
                }
            }
        })
        .exec()
        .then(patientFile => {
            res.status(201).json(patientFile);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

exports.addPatientFile = (req, res, next) => {
};
