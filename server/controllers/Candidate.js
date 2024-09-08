const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const candidateSchema = require("../models/Candidate");

exports.addCandidate = async (req, res) => {
  try {
    const candidate = await new candidateSchema(req.body).save();
    res.status(200).json({
      success: true,
      candidate,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};

exports.getCandidate = async (req, res) => {
  const { skills, experience } = req.query;
  try {
    let query = {};
    if (skills) query.skills = { $in: skills.split(",") };
    if (experience) query.experience = { $gte: experience };

    const candidates = await Candidate.find(query);
    res.json(candidates);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateCandidate = async (req, res) => {
  try {
    const id = req.body.id;
    await candidateSchema.findByIdAndUpdate(id, { $set: req.body });
    res.status(200).json({
      success: true,
      message: "deleted user successfully",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};

exports.deleteCandidate = async (req, res) => {
  try {
    const id = req.body.id;
    await candidateSchema.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "deleted user successfully",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error,
    });
  }
};
