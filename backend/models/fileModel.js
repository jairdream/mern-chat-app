const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
    {
        fileName: { type: String, require: true },
        path: { type: String, require: true },
        size: { type: Number },
        type: { type: String, require: true },
    },
    { timestamps: true }
)

const File = mongoose.model("File", fileSchema);
module.exports = File;