const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // Ensure that email is required
  },
  password: {
    type: String,
    required: true, // Ensure that password is required
  },
  role: {
    type: String,
    enum: ["admin", "user"], // Restrict role to 'admin' or 'user'
    default: "user", // Set default role to 'user'
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
