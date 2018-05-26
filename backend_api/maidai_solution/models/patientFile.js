const mongoose = require('mongoose');
const patientFileSchema = mongoose.Schema({
    patient: {
        type: {
            firstname: {
                type: String,
                required: true,
                trim: true
            },
            lastname: {
                type: String,
                required: true,
                trim: true
            },
            birthdate: {
                type: String,
                required: true,
            },
            email: {
                type: String,
            },
            phonenumber: {
                type: String,
            },
            gender: {
                type: String,
                enum: ['Male', 'Female']
            }
        },
        required: true,
    },
    note: {
        type: String,
        required: true
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointments'
    }],
    analyzeFiles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AnalyzeFiles'
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