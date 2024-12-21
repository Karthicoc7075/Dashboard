const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {
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

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;