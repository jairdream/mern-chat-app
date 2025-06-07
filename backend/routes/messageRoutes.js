const express = require("express");
const {
  allMessages,
  sendMessage,
  readMessages,
  unreadMessagesCount,
  updateMessage,
} = require("../controllers/messageControllers");
const { protectUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:channelId").get(protectUser, allMessages);
router.route("/unread/:channelId").get(protectUser, unreadMessagesCount);
router.route("/").post(protectUser, sendMessage);
router.route("/:messageId").put(protectUser, updateMessage);
router.route("/read").post(protectUser, readMessages);

module.exports = router;
