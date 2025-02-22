const generateToken = require("../utils/jwtconfig");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const cloudinary = require("../utils/cloudinary");
require("dotenv").config();

const signup = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    if (phone.length !== 10) {
      return res.status(400).json({ message: "Phone number must be 10 digits" });
    }

    // Convert email to lowercase for case-insensitive matching
    const lowerCaseEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: lowerCaseEmail });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email: lowerCaseEmail,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      profilePic: newUser.profilePic,
      createdAt :newUser.createdAt,
    });
  } catch (error) {
    console.error("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert email to lowercase before searching
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      profilePic: user.profilePic,
      createdAt : user.createdAt,
    });

  } catch (error) {
    console.error("Error in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", { maxAge : 0});
  res.status(200).json({ message: "Logged out successfully" });
};

const updateProfile = async (req,res)=>{
  try {

    const { profilePic} = req.body;
    const userID = req.user._id;

    if(!profilePic){
      return res.status(400).json({ message : "profilepic is required"});
    }

    const uploadResponce = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(userID, { profilePic : uploadResponce.secure_url}, { new : true});

    res.status(200).json(updatedUser);
    
  } catch (error) {
    console.error("Error in updateProfile controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Error in checkAuth route:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
  };

module.exports = { signup, login, logout, updateProfile , checkAuth};
