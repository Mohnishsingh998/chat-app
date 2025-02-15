const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String },  // Optional if login is OTP-based
    profilePic: { type: String, default: "" },
    isOnline: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
