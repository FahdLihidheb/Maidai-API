const mongoose = require('mongoose');
const appointmentSchema = mongoose.Schema({
    patientFile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientFiles'
    },
    cause: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    analyzeFile: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AnalyzeFiles'
    }],
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