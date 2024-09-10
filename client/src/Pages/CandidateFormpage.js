import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Chat message streaming (typing effect)
const StreamingMessage = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  let index = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return <motion.div className="text-sm">{displayedText}</motion.div>;
};

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  // Handle sending new messages
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = { id: Date.now(), text: inputMessage, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Simulate bot response with a streaming message
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: "This is a streamed bot response.",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000);

      setInputMessage("");
    }
  };

  // Render each message with animations and avatars
  const renderMessages = () =>
    messages.map((msg, index) => (
      <motion.div
        key={msg.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex items-start mb-2 ${
          msg.sender === "user" ? "justify-end" : "justify-start"
        }`}
      >
        {msg.sender === "bot" && <FaUserCircle className="mr-2 text-2xl" />}
        <div
          className={`p-2 rounded-lg shadow-lg max-w-xs ${
            msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {msg.sender === "bot" ? (
            <StreamingMessage text={msg.text} />
          ) : (
            <div>{msg.text}</div>
          )}
        </div>
        {msg.sender === "user" && <FaUserCircle className="ml-2 text-2xl" />}
      </motion.div>
    ));

  return (
    <div className="w-full h-screen p-6 flex flex-col">
      <div className="flex-grow overflow-y-auto p-4 bg-white rounded-lg shadow-lg">
        {renderMessages()}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
