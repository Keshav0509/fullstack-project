import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

dotenv.config();

// const uri = "mongodb://localhost:27017/linux";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\nMongo Database  connected: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
