const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  chatName: { type: String },  // Only for group chats
  isGroupChat: { type: Boolean, default: false },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],  // Users in the chat
  latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },  // Last message
  groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  // Only for groups
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
