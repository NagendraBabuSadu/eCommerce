// mongoose schema

import mongoose from "mongoose";
import dotenv from "dotenv";

// 4. Connect to a MongoDB
dotenv.config({ path: ".env.local" });

const MONGO_DB_URL = process.env.MONGO_DB_URL;

const connectDb = async () => {
  await  mongoose
    .connect(MONGO_DB_URL)
    .then(() => {
      console.log("Connected to mongoDb");
    })
    .catch((err) => {
      console.log("error is: ", err);
    });
};

export default connectDb;