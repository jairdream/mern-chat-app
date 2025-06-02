const express = require("express");
const {
  allMessages,
  sendMessage,
  readMessages,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);
router.route("/read").post(protect, readMessages);

module.exports = router;
