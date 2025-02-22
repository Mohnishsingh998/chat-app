const {Server} = require('socket.io');
const http = require('http');
const express = require('express');
require("dotenv").config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:[process.env.CLIENT_URL],
  },
});
function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap = {};
io.on("connection", (Socket)=>{
  console.log("Client connected", Socket.id);
 
  const userId = Socket.handshake.query.userId
  if(userId) userSocketMap[userId]= Socket.id
// io.emit is used to send events to all the conected clients
  io.emit("getOnlineUser", Object.keys(userSocketMap));
  Socket.on("disconnect", ()=>{
    console.log("Client disconnected", Socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  })
})

module.exports = {app , server ,io , getReceiverSocketId};