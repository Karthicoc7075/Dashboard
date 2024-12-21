const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    createdBy: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dashboard_user',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;