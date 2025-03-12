// src/Deals.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../Styles/Deals.css";

const socket = io("http://localhost:3001");

function Deals() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]); // to store list of users
  const [selectedUserId, setSelectedUserId] = useState(null); // to store the selectd user for private message

  useEffect(() => {
    //fetch users from the backend
    fetch("http://localhost:3001/auth/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
    //listen for incoming message
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
    if (message.trim() && selectedUserId) {
      socket.emit("sendPrivateMessage", {
        toUserId: selectedUserId, //send message to selected user
        message: message,
      }); // Emit message to the backend
      // setMessages((prevMessages) => [...prevMessages, message]); // Add message to UI
      setMessage("");
    } else {
      alert("please select a user and enter a message");
    }
  };

  const handleUserSelection = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div>
      <h2>Deals Chat</h2>
      {/*User selection*/}
      <div className="user-selection">
        <h3>Select a user to send a private message</h3>
        <ul>
          {users.map((user) => {
            return (
              <li
                key={user._id}
                onClick={() => handleUserSelection(user._id)} // Set selected user
                className={selectedUserId === user._id ? "selected" : ""}
              >
                {user.username}
              </li>
            );
          })}
        </ul>
      </div>

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
