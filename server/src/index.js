const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./utils/db");
const { app, server } = require("./utils/socket");
const path = require("path");

// Routes
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cookieParser = require("cookie-parser");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const clientBuildPath = path.join(__dirname, "../../client/dist");

console.log("Serving frontend from:", clientBuildPath);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
