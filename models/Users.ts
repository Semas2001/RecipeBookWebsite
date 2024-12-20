import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string; 
}

const userSchema: Schema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "User",
    versionKey: false,
  }
);

const User =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
