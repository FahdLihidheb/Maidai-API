const mongoose = require('mongoose');
const analyzeFileSchema = mongoose.Schema({
    codename: {
        type: String,
        required: true
    },
    patientFile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientFiles'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors'
    },
    sampleCellImage: {
        type: String,
        required: true
    },
    diagnosis: {
        type: {
            cancerTypes: [{
                type: {
                    label: String,
                    precision: Float32Array
                }
            }],
            evaluationTime: Float32Array,
        },
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("AnalyzeFiles", analyzeFileSchema);