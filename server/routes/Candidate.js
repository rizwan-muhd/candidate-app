const express = require("express");
const router = express();
const {
  addCandidate,
  getCandidate,
  updateCandidate,
  deleteCandidate,
} = require("../controllers/Candidate");

router.post("/add-candidate", addCandidate);
router.get("/get-candidate", getCandidate);
router.put("/update-candidate", updateCandidate);
router.delete("/delete-candidate", deleteCandidate);

module.exports = router;
