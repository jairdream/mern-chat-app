const express = require("express");
const {
  allMessages,
  sendMessage,
  readMessages,
  unreadMessagesCount,
  updateMessage,
  searchMessage,
} = require("../controllers/messageControllers");
const { protectUser, protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/unread/:channelId").get(protectUser, unreadMessagesCount);
router.route("/search").get(protectUser, searchMessage);
router.route("/:channelId").get(protectUser, allMessages);
router.route("/").post(protectUser, sendMessage);
router.route("/:messageId").put(protectUser, updateMessage);
router.route("/read").post(protectUser, readMessages);

module.exports = router;
