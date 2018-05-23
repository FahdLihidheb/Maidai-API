const mongoose = require('mongoose');
const analyzeFileSchema = mongoose.Schema({
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors'
    },
    diagnosis: {
        type: {
            canserTypes: [{
                type: {
                    label: String,
                    precision: Float32Array
                }
            }],
            evaluationTime: Float32Array,
            cellSample: String
        },
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("AnalyzeFiles", analyzeFileSchema);