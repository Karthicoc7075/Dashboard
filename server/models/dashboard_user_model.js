const mongoose = require('mongoose');

const dashboardUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const dashboardUser = mongoose.model('dashboard_user', dashboardUserSchema);

module.exports = dashboardUser;