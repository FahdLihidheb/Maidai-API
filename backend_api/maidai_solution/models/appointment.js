const mongoose = require('mongoose');
const appointmentSchema = mongoose.Schema({
    patientFile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientFiles'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors'
    },
    visitType:{
        type: String,
        enum: ['New', 'Controle'],
        default: true
    },
    problem: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    dueDate: {
        type: {
            day: String,
            month: String,
            year: String,
            time: String
        },
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Appoinments", appointmentSchema);