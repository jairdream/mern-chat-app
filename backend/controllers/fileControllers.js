const asyncHandler = require("express-async-handler");
const multer = require('multer');
const path = require('path');
const File = require("../models/fileModel");

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/uploads/'); // Directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage }).single('file');

const uploadFile = async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const { filename, path, size, mimetype } = req.file;

    const newFile = new File({
        filename: filename,
        path: path,
        size: size,
        type: mimetype,
    });

    newFile.save()
        .then(() => {
            res.json({ url: path });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error saving file metadata');
        });
}

module.exports = { upload, uploadFile };