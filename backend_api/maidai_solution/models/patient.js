const mongoose = require('mongoose');
const patientSchema = mongoose.Schema({
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
    patientFile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientFiles'
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Patients", patientSchema);