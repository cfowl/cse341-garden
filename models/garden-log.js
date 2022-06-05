const mongoose = require('mongoose');

const gardenLogSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    seedName: {
        type: String,
        required: true
    },
    seedType: {
        type: String,
        required: false,
        default: 'n/a'
    },
    variety: {
        type: String,
        required: true
    },
    plantedQty: {
        type: String,
        required: true
    },
    plantedDate: {
        type: String,
        required: true
    },
    harvestedQty: {
        type: String,
        required: false,
        default: ''
    },
    harvestedDate: {
        type: String,
        required: false,
        default: ''
    },
    notes: {
        type: String,
        required: false,
        default: ''
    }
});

module.exports = mongoose.model('garden-log', gardenLogSchema);