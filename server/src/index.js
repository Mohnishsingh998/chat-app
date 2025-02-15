const express = require("express");
const cors = require("cors"); // Allow frontend requests
const bodyParser = require("body-parser");
require("dotenv").config();
require("./utils/db");  // Connect to MongoDB
const app = express();

app.use(cors());
app.use(bodyParser.json()); // Add this line to parse JSON
app.use(express.urlencoded({ extended: true })); // For form data

// Your routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const PORT  = process.env.PORT;
app.listen(PORT, ()=>{
  console.log(`server is running at http://localhost:${PORT}`);
});