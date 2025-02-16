const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Ensure `cookie-parser` is used in `index.js`

    if (!token) {
      return res.status(401).json({ message: "You need to login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Assign found user to `req.user`
    next(); // Move to next middleware or route handler

  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = protectRoute;
