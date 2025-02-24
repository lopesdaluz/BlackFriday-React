// src/Deals.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../Styles/Deals.css";

const socket = io("http://localhost:3001");

function Deals() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleSendMessage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (message.trim()) {
      const msgWithUserInfo = {
        text: message,
        user: user.username,
        userId: user.userId,
      };
      socket.emit("send_message", msgWithUserInfo); // Emit message to the backend
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
            <strong>{msg.user}:</strong>
            {msg.text}
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
