import mongoose from 'mongoose';
import dotenv from 'dotenv';

// dotenv.config();


dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL ?? 'mongodb://0.0.0.0:27017/mydatabase', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;