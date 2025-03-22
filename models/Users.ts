import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new mongoose.Schema(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    name: { 
      type: String, 
      required: [true, "please provide your Name"]
    },
    email: { 
      type: String, 
      required: [true, "please provide your email"],
      unique: true 
    },
    password: { 
      type: String, 
      required: [true, "please provide a password"] 
    },
  },
  {
    timestamps: true,
    collection: "User",
    versionKey: false,
  }
);

const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
