import mongoose, { Schema } from "mongoose";

interface IUser {
  email: string;
  role?: string;
  token: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  token: { type: String },
});

export default mongoose.model("User", userSchema);
