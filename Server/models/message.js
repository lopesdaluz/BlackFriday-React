const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ID of the sender
  username: { type: String, required: true }, //username of the sender
  text: { type: String, required: true }, // message content
  timestamp: { type: Date, default: Date.now }, //when the message was sent
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
