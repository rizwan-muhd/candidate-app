const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const candidateSchema = require("../models/Candidate");

exports.addCandidate = async (req, res) => {
  try {
    const role = req.user.role;
    if (role === "user") {
      res.status(401).json({ message: "Permission denied" });
    }
    const candidate = await new candidateSchema(req.body).save();
    res.status(200).json({
      success: true,
      candidate,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: err,
    });
  }
};

exports.getCandidate = async (req, res) => {
  try {
    const role = req.user.role;
    if (role === "user") {
      res.status(401).json({ message: "Permission denied" });
    }
    console.log(role);
    const { skills, experience } = req.query;
    console.log(skills, experience);
    let query = {};
    if (skills) {
      const skillsArray = skills ? skills.split(",") : [];
      query.skills = {
        $in: skillsArray.map((skill) => new RegExp(skill, "i")),
      };
    }
    if (req.query.id) {
      query._id = req.query.id;
    }
    if (experience) query.experience = { $lte: experience };
    console.log(query);
    const candidates = await candidateSchema.find(query);
    res.json(candidates);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateCandidate = async (req, res) => {
  try {
    const role = req.user.role;
    if (role === "user") {
      res.status(401).json({ message: "Permission denied" });
    }
    const id = req.body._id;
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
    const role = req.user.role;
    if (role === "user") {
      res.status(401).json({ message: "Permission denied" });
    }
    const id = req.query.id;
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
