const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String },  // Optional if login is OTP-based
    profilePic: { type: String, default: "" },
    isOnline: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },  // Check if OTP is verified
    otp: { type: String },  // Store OTP temporarily
    otpExpiry: { type: Date },  // Expiry time for OTP
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
