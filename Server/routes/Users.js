const express = require("express");
const router = express.Router();
// const { Users } = require("../models");
const User = require("../models/Users.js");
const bcrypt = require("bcrypt");

//Registration
router.post("/register", async (req, res) => {
  console.log("Received registration request:", req.body);

  const { name, lastname, email, username, password } = req.body;

  try {
    //check if a user already exist
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "username already taken!" });
    }

    //Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed password:", hashedPassword);
    //create a new user
    const newUser = await User.create({
      name,
      lastname,
      email,
      username,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    return res.status(500).json({ error: "Failed to create user" });
  }
});

module.exports = router;
