// src/Deals.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../Styles/Deals.css";
import Avatar from "react-avatar";

const socket = io("http://localhost:3001");

function Deals({ currentUserId, currentUsername }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]); // to store list of users
  const [selectedUserId, setSelectedUserId] = useState(null); // to store the selectd user for private message
  const [searchQuery, setSearchQuery] = useState(""); // a state for search after a user

  useEffect(() => {
    if (!currentUserId) return;
    //fetch users from the backend
    fetch("http://localhost:3001/auth/users")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((user) => user._id !== currentUserId);
        setUsers(filteredData);
      })
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

    //Lyssna på nya användare
    socket.on("userRegistered", (newUser) => {
      setUsers((prevUsers) => {
        if (
          newUser._id !== currentUserId &&
          !prevUsers.some((user) => user._id === newUser._id)
        ) {
          return [...prevUsers, newUser];
        }
        return prevUsers;
      });
    });

    //cleanup function
    return () => {
      socket.off("receiveMessage");
      socket.off("userRegistered");
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

  //Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="deals-container">
      <h2>Deals Chat</h2>
      <div className="chat-layout">
        {/*User Selection Sidebar*/}
        <div className="user-sidebar">
          {/* Visa inloggad användare */}
          <div className="current-user-profile">
            <Avatar name={currentUsername} size="40" round={true} />
            <span className="current-username">You: {currentUsername}</span>
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <div className="user-list">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => handleUserSelection(user._id)}
                className={`user-card ${
                  selectedUserId === user._id ? "selected" : ""
                }`}
              >
                <Avatar name={user.username} size="40" round={true} />
                <span className="username">{user.username}</span>
                {/*statusIndikation*/}
              </div>
            ))}
          </div>
        </div>
        {/*Chat Area*/}
        <div className="chat-area">
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
                <div
                  key={index}
                  className={`message ${
                    msg.fromUserId === currentUserId ? "sent" : "received"
                  }`}
                >
                  <span className="message-text">{msg.message}</span>
                  <span className="timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              autoFocus={selectedUserId !== null}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deals;
