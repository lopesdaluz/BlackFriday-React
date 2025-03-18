const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  userId: String,
  toUserId: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);
