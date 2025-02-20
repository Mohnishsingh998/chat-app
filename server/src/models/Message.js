const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Sender of the message
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Receiver of the message
  text: { type: String },  // Text content of the message
  image: { type: String }, // Image URL
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
