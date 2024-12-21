const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    languageName: {
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

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;