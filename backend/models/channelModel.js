const mongoose = require("mongoose");

const channelModel = mongoose.Schema(
  {
    name: { type: String, trim: true },
    isProductChannel: { type: Boolean, default: false },
    isPinned: { type: Boolean, default: false },
    pinnedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const Channel = mongoose.model("Channel", channelModel);

module.exports = Channel;
