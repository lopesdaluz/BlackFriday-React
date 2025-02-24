// const express = require("express");
// const app = express();
// const cors = require("cors");
// const db = require("./models");

// app.use(express.json());
// app.use(cors());

// //Router - import router from the routes folder:

// //Import the users router from the routes folder
// const usersRouter = require("./routes/Users");
// //Use the user router for any requests to the /users endpoint
// app.use("/auth", usersRouter);

// db.sequelize.sync().then(() => {
//   app.listen(3001, () => {
//     console.log("server running on port 3001");
//   });
// });
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

//Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  //handle incoming messages
  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  //Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
// //test
// app.get("/test", (req, res) => {
//   res.json({ message: "Backend is working" });
// });

// Import the users router from the routes folder
const usersRouter = require("./routes/Users");
// Use the user router for any requests to the /auth endpoint
app.use("/auth", usersRouter);

// Start the Express and Socket server
server.listen(3001, () => {
  console.log("Server running on port 3001");
});
