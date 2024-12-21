const mongoose = require('mongoose');


const sliderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sliderType: {
        type: String,
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
    },
    link:{
        type: String,
    },
    news:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'News'
    },
   material:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material'
   },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   createdAt:{
        type: Date,
        default: Date.now
    }
});

// Create the slider model
const Slider = mongoose.model('Slider', sliderSchema);

// Export the slider model
module.exports = Slider;