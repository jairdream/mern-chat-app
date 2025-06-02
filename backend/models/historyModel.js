const mongoose = require("mongoose");

const historySchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    amount: { type: Number, default: 1 },
    buyAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

const History = mongoose.model("History", historySchema);
module.exports = History;