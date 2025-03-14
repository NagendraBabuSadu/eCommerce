// mongoose schema

import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  email: String;
  password: String;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// 3. Create a Model
export const createUser = model<IUser>("user", userSchema);

// 4. Connect to a MongoDB
dotenv.config({ path: ".env.local" });
const MONGO_DB_URL = process.env.MONGO_DB_URL as string;
mongoose.connect(MONGO_DB_URL);

module.exports = { createUser: createUser };
