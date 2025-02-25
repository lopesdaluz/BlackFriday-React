const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  userId: { type: String, require: true }, // ID of the sender
  username: { type: String, require: true }, //username of the sender
  message: { type: String, require: true }, // message content
  timestamp: { type: Date, default: Date.now }, //when the message was sent
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
