import mongoose, { Schema } from "mongoose";

interface IUser {
  email: string;
  password: string;
  role?: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

export default mongoose.model("User", userSchema);
