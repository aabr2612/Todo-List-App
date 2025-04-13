import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String, default: "" },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
