const express = require("express");
const {
    upload,
    uploadFile,
    downloadFile,
} = require("../controllers/fileControllers");

const router = express.Router();

router.route("/upload").post(upload, uploadFile);
router.route("/download/:fileId").get(downloadFile);

module.exports = router;