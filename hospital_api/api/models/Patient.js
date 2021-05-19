var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PatientSchema = new Schema({
    name: {
        type: String,
        required: 'name is needed'
    },
    illness: {
        type: Number,
        required: 'illness is needed'
    },
    pain: {
        type: Number,
        required: 'pain level is needed'
    },
    created: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Patient', PatientSchema);
