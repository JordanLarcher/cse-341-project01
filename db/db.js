const mongoose = require('mongoose');
const winston = require("winston");

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        winston.info('MongoDB Connected')
    } catch (error){
        winston.error(`MongoDB connection error: ${error.message}`);
    throw error;
    }
};


module.exports = connectDB;