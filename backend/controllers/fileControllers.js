const asyncHandler = require("express-async-handler");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const File = require("../models/fileModel");

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage }).array('files');

const uploadFile = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }
  const fileData = req.files.map(file => ({
    name: file.filename,
    path: file.path,
    size: file.size,
    type: file.mimetype,
  }));

  try {
    // Save all files metadata
    const savedFiles = await File.insertMany(fileData);
    const response = savedFiles.map(file => ({
      fileId: file._id,
      url: file.path,
      type: file.type,
      name: file.name
    }));
    
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error saving file metadata');
  }
}

const downloadFile = async (req, res) => {
  const { fileId } = req.params;
  const file = await File.findById(fileId);
  const directoryPath = path.join(__dirname, '../uploads');
  console.log(directoryPath);
  console.log(file);
  const filePath = path.join(directoryPath, file.name);

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send('File not found');
      return;
    }

    // Read the file and send it in the response
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send('Could not read the file');
        return;
      }
      
      res.setHeader('Content-Disposition', `attachment; filename=${file.name}`);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.send(data);
    });
  });
};

module.exports = { upload, uploadFile, downloadFile };