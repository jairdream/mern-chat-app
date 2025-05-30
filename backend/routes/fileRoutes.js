const express = require("express");
const {
    upload,
    uploadFile,
} = require("../controllers/fileControllers");

const router = express.Router();

router.route("/upload").post(upload, uploadFile);

module.exports = router;