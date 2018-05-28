const Appointment = require('../models/appointment');

exports.getAppointmentByDoctor = (req, res, next) => {
    Appointment.find({
            createdBy: req.userData.userId
        })
        .sort('-createdOn')
        .populate({
            path: 'patientFile',
            select: 'patient',
            options: {
                sort: {
                    createdOn: -1
                }
            }
        })
        .exec()
        .then(appointments => {
            res.status(201).json(appointments);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

exports.getAppointmentByPatientFile = (req, res, next) => {
    Appointment.find({
            createdBy: req.userData.userId,
            patientFile: req.body.patientFileId
        })
        .sort('-createdOn')
        .populate({
            path: 'patientFile',
            select: 'patient',
            options: {
                sort: {
                    createdOn: -1
                }
            }
        })
        .exec()
        .then(appointments => {
            res.status(201).json(appointments);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

exports.getAppointmentById = (req, res, next) => {
    Appointment.findById(req.params.appointmentId)
        .populate({
            path: 'patientFile',
            select: 'patient',
            options: {
                sort: {
                    createdOn: -1
                }
            }
        })
        .exec()
        .then(appointment => {
            res.status(201).json(appointment);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};

exports.addAppointment = (req, res, next) => {
    const appointment = new Appointment({
        patientFile: req.body.patientFile,
        createdBy: req.userData.userId,
        visitType: req.body.visitType,
        problem: req.body.problem,
        note: req.body.note,
        dueDate: req.body.dueDate
    });
    appointment.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};