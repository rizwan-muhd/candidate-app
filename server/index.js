const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connection = require("./connections/Connection");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

app.use(cors());

dotenv.config();

connection();

app.use(bodyParser.urlencoded({ extended: false }));

const candidate = require("./routes/Candidate");

app.use("/api/candidate", candidate);

app.use(bodyParser.json());

app.listen(8080, () => {
  console.log("server running on port 8080");
});
