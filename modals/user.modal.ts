import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    image: String,
    emailVerified: {
      type: Boolean,
      default: null,
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.users || mongoose.model("users", userSchema);
