//Endpoints
const express = require("express");
// const { Users } = require("../models");
const User = require("../models/Users.js");
const bcrypt = require("bcrypt");

module.exports = (io) => {
  const router = express.Router();

  //Registration route
  router.post("/register", async (req, res) => {
    const { name, lastname, email, username, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        lastname,
        email,
        username,
        password: hashedPassword,
      });
      await user.save();
      //Skicka event till alla klienter
      io.emit("userRegistered", { _id: user._id, username: user.username });

      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  //Login route
  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log("Login request received:", req.body);

    try {
      //Find user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      console.log("User found:", user);

      //compare the password wit hashed
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
      //if login is successfully
      res.status(200).json({
        message: "Login successfully",
        username: user.username,
        userId: user._id,
      });
    } catch (err) {
      console.error("Error during login", err);
      res.status(500).json({ error: "Server error" });
    }
  });

  // route to fetch users
  router.get("/users", async (req, res) => {
    try {
      const users = await User.find(); //Get all users from users collection
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Error fetching users");
    }
  });

  //route to get messages between two users
  // router.get("auth/messages/:fromUserId/:toUserId", async (req, res) => {
  //   const { fromUserId, toUserId } = req.params;
  //   try {
  //     const messages = await Message.find({
  //       $or: [
  //         { userId: fromUserId, toUserId: toUserId },
  //         { userId: toUserId, toUserId: fromUserId },
  //       ],
  //     }).sort({ timestamp: 1 }); // Sortera efter tid
  //     res.json(
  //       messages.map((msg) => ({
  //         fromUserId: msg.userId,
  //         toUserId: msg.toUserId,
  //         message: msg.text,
  //         timestamp: msg.timestamp,
  //       }))
  //     );
  //   } catch (error) {
  //     console.error("Error fetching messages:", error);
  //     res.status(500).json({ error: "Server error" });
  //   }
  // });

  return router;
};
