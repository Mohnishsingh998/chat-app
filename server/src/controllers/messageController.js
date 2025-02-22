const User = require("../models/User");
const Message = require("../models/Message");
const { getReceiverSocketId, io } = require("../utils/socket");
const cloudinary = require("cloudinary").v2;

const getUsersForMessages = async (req, res) => {
  try {
    const LoggedInUser = req.user._id;
    const FilteredUser = await User.find({ _id: { $ne: LoggedInUser } }).select("-password");

    res.status(200).json(FilteredUser);
  } catch (error) {
    console.error("Error in getUsersForMessages", error);
    res.status(500).json({ message: "Internal messageController Server Error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json({ message: "Messages fetched successfully", messages });
  } catch (error) {
    console.error("Error in getMessages controller", error);
    res.status(500).json({ message: "Internal messageController Server Error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    console.log("Received message data:", req.body); // ✅ Debug log

    const { id: receiverId } = req.params;
    const { text, image } = req.body; 
    const senderId = req.user._id;

    let imageUrl = "";
    if (image) {
      console.log("Uploading image to Cloudinary...");
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url; 
      console.log("Uploaded Image URL:", imageUrl); // ✅ Debug log
    } else {
      console.log("No image received.");
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    });

    await newMessage.save();
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
    io.to(receiverSocketId).emit('newMessage', newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = { getUsersForMessages, getMessages, sendMessage };
