const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError if file is required multiple times
module.exports = mongoose.models.users || mongoose.model("users", UserSchema);
