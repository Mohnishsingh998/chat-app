const express = require("express");
const cors = require("cors"); // Allow frontend requests
require("dotenv").config();
require("./utils/db");  // Connect to MongoDB
const app = express();
// Your routes
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const PORT  = process.env.PORT;
app.listen(PORT, ()=>{
  console.log(`server is running at http://localhost:${PORT}`);
});