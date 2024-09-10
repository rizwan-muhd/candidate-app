require("dotenv").config(); // Load .env variables

const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGO_URL;

// Debugging: Check if the MongoDB URL is being loaded correctly
console.log("MongoDB URL:", MONGODB_URL);

mongoose.set("strictQuery", false);

const connection = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Handle connection events
mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("Error in database connection:", error.message);
});

module.exports = connection;
