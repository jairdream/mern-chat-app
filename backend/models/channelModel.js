const mongoose = require("mongoose");

const channelModel = mongoose.Schema(
  {
    name: { type: String, trim: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const Channel = mongoose.model("Chat", channelModel);

module.exports = Channel;
