const express = require('express');
const protectRoute = require('../middleware/authMiddleware');

const messageRouter = express.Router();

const { getUsersForMessages, getMessages, sendMessage } = require('../controllers/messageController');

messageRouter.get("/users",protectRoute, getUsersForMessages);
messageRouter.get("/:id",protectRoute, getMessages);
messageRouter.post("/send/:id",protectRoute, sendMessage);




module.exports = messageRouter;