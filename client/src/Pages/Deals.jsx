// src/Deals.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../Styles/Deals.css";
import Avatar from "react-avatar";

const socket = io("http://localhost:3001");

function Deals({ currentUserId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]); // to store list of users
  const [selectedUserId, setSelectedUserId] = useState(null); // to store the selectd user for private message

  useEffect(() => {
    if (!currentUserId) return;
    //fetch users from the backend
    fetch("http://localhost:3001/auth/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));

    //Joing priivate room

    socket.emit("join", currentUserId);
    console.log(`ℹ️ Joining room with ID: ${currentUserId}`);

    //listen for incoming message
    socket.on("receiveMessage", (msg) => {
      console.log("Received message:", msg);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, msg];
        console.log("New messages state:", updatedMessages);
        return updatedMessages;
      });
    });

    //cleanup function
    return () => {
      socket.off("receiveMessage");
    };
  }, [currentUserId]);

  //function to send message
  const handleSendMessage = () => {
    console.log("Sending message to:", selectedUserId, "Message:", message);
    if (message.trim() && selectedUserId) {
      socket.emit("sendPrivateMessage", {
        toUserId: selectedUserId, // Send message to selected user
        fromUserId: currentUserId,
        message: message,
      });

      setMessage("");
    } else {
      alert("Please select a user and enter a message.");
    }
  };

  //function to select user and get previous messages
  const handleUserSelection = async (userId) => {
    setSelectedUserId(userId);

    try {
      const response = await fetch(
        `http://localhost:3001/messages/${currentUserId}/${userId}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setMessages(data); // Load past messages
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div>
      <h2>Deals Chat</h2>
      {/*User Selection */}
      <div className="user-selection">
        <h3>Select a user to send a message:</h3>
        <ul>
          {users.map((user) => (
            <li
              key={user._id}
              onClick={() => handleUserSelection(user._id)}
              className={`user-item ${
                selectedUserId === user._id ? "selected" : ""
              }`}
            >
              <Avatar name={user.username} size="40" round={true} />
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
      </div>

      {/*chat message */}

      <div className="chat-box">
        {messages
          .filter(
            (msg) =>
              (msg.fromUserId === currentUserId &&
                msg.toUserId === selectedUserId) ||
              (msg.fromUserId === selectedUserId &&
                msg.toUserId === currentUserId)
          )
          .map((msg, index) => (
            <div key={index} className="message">
              <strong>
                {msg.fromUserId === currentUserId ? "You" : msg.fromUserId}:
              </strong>{" "}
              {msg.message}
              <span className="timestamp">
                ({new Date(msg.timestamp).toLocaleTimeString()})
              </span>
            </div>
          ))}
      </div>

      {/*chat input */}
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Deals;
