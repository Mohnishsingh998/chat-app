
const User = require("../models/User");
const Message = require("../models/Message");
const cloudinary = require("cloudinary").v2;

const getUsersForMessages = async (req,res)=>{
  try {
    const LoggedInUser = req.user._id;
    const FilteredUser = await User.find({_id : {$ne : LoggedInUser}}).select("-password");

    res.status(200).json(FilteredUser);

  } catch (error) {
    console.error("Error in getUsersForMessages", error);
    res.status(500).json({message: "Internal messageController Server Error"});
  }
};


const getMessages = async (req,res)=>{
  try {
    const {id : userTocChaatId} = req.params;
    const myId = Req.user._id;

    const message = await Message.find({
      $or : [
        {senderId : myId, receiverId : userTocChaatId},
        {senderId : userTocChaatId, receiverId : myId}
      ]
    })

    res.status(200).json({message: "Messages fetched successfully", message});
  } catch (error) {
    console.error("Error in getMessages controller", error);
    res.status(500).json({message: "Internal messageController Server Error"});
  }
};


const sendMessage = async (req,res)=>{
  try {
    const {id : receiverId} = req.params;
    const {text , image } = req.body;
    const senderId = req.user._id;

    let imageUrl = "";
    if(image){
      // upload image  to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;

    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image : imageUrl
    });

    await newMessage.save();
    // todo : real time functionalaity
    res.status(201).json({message: "Message sent successfully", newMessage});
  } catch (error) {
    console.error("Error in sendMessage controller", error);
    res.status(500).json({message: "Internal messageController Server Error"});
  }
};



module.exports = { getUsersForMessages , getMessages , sendMessage };