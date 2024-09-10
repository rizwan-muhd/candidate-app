const express = require("express");
const router = express();
const {
  addCandidate,
  getCandidate,
  updateCandidate,
  deleteCandidate,
} = require("../controllers/Candidate");
const auth = require("../utils/Auth");

router.post("/add-candidate", auth, addCandidate);
router.get("/get-candidate", auth, getCandidate);
router.put("/update-candidate", auth, updateCandidate);
router.delete("/delete-candidate", auth, deleteCandidate);

module.exports = router;
