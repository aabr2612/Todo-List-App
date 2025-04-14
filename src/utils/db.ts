import dotenv from "dotenv";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    dotenv.config();

    const mongodbUri = process.env.MONGODB_URI;

    if (!mongodbUri) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables"
      );
    }

    await mongoose.connect(mongodbUri);

    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
