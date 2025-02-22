require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

const generateToken = (userId, res)=>{
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  res.cookie("token", token , {
    httpOnly: true,  // to prevent access from javascript code in the browser 
    sameSite: "strict", // to prevent csrf attacks 
    secure: false, // to ensure that the cookie is sent only over https in production
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  return token;

};

module.exports = generateToken;