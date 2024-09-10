const express = require("express");
const router = express();
const { register, login } = require("../controllers/User");

router.post("/login", login);
router.post("/register", register);

module.exports = router;
