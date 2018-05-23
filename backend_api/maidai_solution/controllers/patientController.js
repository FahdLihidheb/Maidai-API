const Patient = require('../models/patient')

exports.getPatients = (req, res, next) => {
    Patient.find()
        .exec()
        .then(patients => {
            res.status(201).json(patients);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

exports.getPatientById = (req, res, next) => {
    Patient.findById(req.params.patientId)
        .exec()
        .then(patient => {
            res.status(201).json(patient);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

exports.addPatient = (req, res, next) => {
    const patient = new Patient(req.body.patient);
    patient.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

exports.fbProfileToPatient = (req, res, next) => {

}