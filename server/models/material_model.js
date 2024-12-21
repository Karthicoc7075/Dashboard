const mongoose = require('mongoose');


const materialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    medium: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mediums',
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    fileLink: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
    },
    views: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: String,
        ref:'dashboard_user',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Material = mongoose.model('Material', materialSchema);

module.exports = Material;