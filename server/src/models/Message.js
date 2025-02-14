const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },  // Chat room ID
  content: { type: String, required: true },  // Message text
  messageType: { type: String, enum: ["text", "image", "video"], default: "text" }, // Message type
  seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],  // Users who read the message
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
