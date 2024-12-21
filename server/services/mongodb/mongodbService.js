const mongoose = require('mongoose');

const mongodbConfig = async(mongodbUrl)=>{
        try {
            await mongoose.connect(mongodbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Failed to connect to MongoDB:', error);
        }
    }


module.exports = mongodbConfig;