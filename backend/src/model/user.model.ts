/* backend/src/model/user.model.ts */

// Import library
import mongoose from "mongoose";

// Schema of user model
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Assigning schema object to the model
const User = mongoose.model("User", userSchema);

export default User;
