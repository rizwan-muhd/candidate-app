const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String },
  skills: [String],
  experience: { type: Number },
  location: { type: String },
  videoInterviewResult: String,
  codingResult: Number,
});

module.exports = mongoose.model("candidate", candidateSchema);
