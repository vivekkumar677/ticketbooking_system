
require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('✅ Connected to the database successfully');
    } catch (err) {
        console.error('⚠️Database connection error', err);
    }
};

module.exports = connectDB;