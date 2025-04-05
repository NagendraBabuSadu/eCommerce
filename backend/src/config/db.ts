import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGO_DB_URL = process.env.MONGO_DB_URL as string;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL);
    console.log("Connected to mongoDb");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); 
  }
};

export default connectDb;
