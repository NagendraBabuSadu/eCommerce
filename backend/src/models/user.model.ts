import mongoose, { Schema } from "mongoose";

interface IUser {
  email: string;
  role?: string;
  token: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    token: { type: String },
    username: { type: String },
    password: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);
