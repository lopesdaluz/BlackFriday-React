const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const http = require("http");

app.use(express.json());
app.use(cors());
const server = http.createServer(app);

// MongoDB connection setup
const dbURI = "mongodb://localhost:27017/blackFridayDB"; // Your MongoDB URI
mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import the Message model (You need to define this in your models folder)
const Message = require("./models/message");

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle incoming messages
  socket.on("sendMessage", async ({ userId, username, message }) => {
    const newMessage = new Message({
      userId,
      username,
      text: message,
      timestamp: new Date(),
    });

    try {
      await newMessage.save(); // Save message to MongoDB
      console.log("Message saved:", newMessage);
      io.emit("receiveMessage", {
        userId,
        username,
        text: newMessage.text,
        timestamp: newMessage.timestamp,
      });
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Import the users router from the routes folder
const usersRouter = require("./routes/Users");
// Use the user router for any requests to the /auth endpoint
app.use("/auth", usersRouter);

// Start the Express and Socket server
server.listen(3001, () => {
  console.log("Server running on port 3001");
});
