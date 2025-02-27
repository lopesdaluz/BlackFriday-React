// src/Deals.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../Styles/Deals.css";

const socket = io("http://localhost:3001");

function Deals() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      console.log("Received message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleSendMessage = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (message.trim()) {
      socket.emit("sendMessage", {
        message: message,
        username: user.username,
        userId: user.userId,
      }); // Emit message to the backend
      // setMessages((prevMessages) => [...prevMessages, message]); // Add message to UI
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Deals Chat</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}:</strong>
            {msg.text}
            <span className="timestamp">
              ({new Date(msg.timestamp).toLocaleTimeString()})
            </span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Deals;
