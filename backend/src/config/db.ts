import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import path from 'path';

// Recreate __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });
console.log("Loaded ENV:", process.env); 

const MONGO_DB_URL = process.env.MONGO_DB_URL as string;

const connectDb = async () => {
  console.log("MONGO_DB_URL:", MONGO_DB_URL);
  try {
    await mongoose.connect(MONGO_DB_URL);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDb;
