const mongoose = require('mongoose')


const classSchema =new mongoose.Schema({
    className:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    subjects:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Subject',
        default: []
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Class = mongoose.model('Class',classSchema)

module.exports = Class