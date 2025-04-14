import dotenv from 'dotenv';

const connectDB = async () =>{
    try{
        dotenv.config();
        const mongoose = require('mongoose');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

export default connectDB;