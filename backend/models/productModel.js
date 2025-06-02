const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    content: { type: String, require: true },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;