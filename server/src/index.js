const express = require("express");
const cors = require("cors"); // Allow frontend requests
require("dotenv").config();
require("cors")();
require("./utils/db"); // Connect to MongoDB
const { app, server } = require("./utils/socket");
const path = require("path");

// Your routes
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cookieParser = require("cookie-parser");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow frontend to send requests to backend
    credentials: true, // Allow frontend to send cookies to backend
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT;
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist","/index.html"));
  });
}
server.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
