const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String },
  skills: [String],
  experience: { type: Number },
  location: { type: String },
  videoInterviewResult: { type: String },
  codingResult: { type: Number },
});

module.exports = mongoose.model("candidate", candidateSchema);
