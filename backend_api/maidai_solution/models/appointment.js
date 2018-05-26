const mongoose = require('mongoose');
const appointmentSchema = mongoose.Schema({
    patientFile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientFiles'
    },
    fbProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FbProfiles'
    },
    status:{
        type: Boolean,
        default: true
    },
    cause: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Appoinments", appointmentSchema);