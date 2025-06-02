const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },
    content: { type: String, trim: true },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
    isViewed: { type: Boolean, trim: false },
    sendAt: { type: Date, default: Date.now },
    receiveAt: { type: Date },
    readAt: { type: Date },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
