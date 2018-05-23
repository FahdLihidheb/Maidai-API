const mongoose = require('mongoose');
const patientFileSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        required: true,
    },
    notes: {
        type: String,
        required: true
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointments'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors',
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("PatientFiles", patientFileSchema);