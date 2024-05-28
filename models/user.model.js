const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  dateOfCreation: {
    type: Date,
    default: () => new Date(),
  },
});

module.exports = mongoose.model("user", userSchema);
