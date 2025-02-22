import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser , subscribeToMessages , unsubscribeFromMessages } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages(selectedUser._id);
      return ()=>{
        unsubscribeFromMessages(selectedUser._id);
      }
    }
  }, [selectedUser?._id, getMessages , subscribeToMessages , unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => {
            if (!message?.senderId) return null; // ✅ Prevent errors if senderId is missing
            return (
              <div
                key={message._id}
                className={`chat ${
                  message.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
                ref={messageEndRef}
              >
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        message.senderId === authUser._id
                          ? authUser.profilePic ||
                            "/pfp-pictures-cqjs3osvdljthh53.webp"
                          : selectedUser?.profilePic ||
                            "/pfp-pictures-cqjs3osvdljthh53.webp"
                      }
                      alt="Profile pic"
                    />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {message.createdAt
                      ? new Date(message.createdAt).toLocaleTimeString()
                      : "N/A"}
                  </time>
                </div>
                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                      onError={(e) => {
                        console.error("Image failed to load:", message.image);
                        e.target.src = "/fallback-image.webp"; // ✅ Handle broken images
                      }}
                    />
                  )}

                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
        <div ref={messageEndRef}></div>
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
