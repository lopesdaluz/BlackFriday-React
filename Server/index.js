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

  // User joins their private room
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their private room ${userId}`);
  });

  // only send message to the intended user
  socket.on("sendPrivateMessage", async ({ toUserId, fromUserId, message }) => {
    console.log(
      `Private message from ${fromUserId} to ${toUserId}: ${message}`
    );
    const newMessage = new Message({
      userId: fromUserId,
      toUserId,
      text: message,
      timestamp: new Date(),
    });

    try {
      await newMessage.save();
      const messageData = {
        fromUserId,
        toUserId,
        message: message,
        timestamp: newMessage.timestamp,
      };
      io.to(toUserId).emit("receiveMessage", messageData); // Skicka till mottagaren
      io.to(fromUserId).emit("receiveMessage", messageData); // Skicka till avsändaren
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

//route to get messages between two users
app.get("/messages/:fromUserId/:toUserId", async (req, res) => {
  const { fromUserId, toUserId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { userId: fromUserId, toUserId: toUserId },
        { userId: toUserId, toUserId: fromUserId },
      ],
    }).sort({ timestamp: 1 }); // Sortera efter tid
    res.json(
      messages.map((msg) => ({
        fromUserId: msg.userId,
        toUserId: msg.toUserId,
        message: msg.text,
        timestamp: msg.timestamp,
      }))
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// NY ROUTE: Hämta alla meddelanden
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }); // Hämta alla meddelanden, sorterade efter tid
    res.json(
      messages.map((msg) => ({
        fromUserId: msg.userId,
        toUserId: msg.toUserId,
        message: msg.text,
        timestamp: msg.timestamp,
      }))
    );
  } catch (error) {
    console.error("Error fetching all messages:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Import the users router from the routes folder
const usersRouter = require("./routes/Users")(io);
// Use the user router for any requests to the /auth endpoint
app.use("/auth", usersRouter);

// Start the Express and Socket server
server.listen(3001, () => {
  console.log("Server running on port 3001");
});
