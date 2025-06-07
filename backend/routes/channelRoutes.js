const express = require("express");
const {
  accessChannel,
  fetchChannels,
  togglePin,
} = require("../controllers/channelControllers");
const { protectUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protectUser, accessChannel);
router.route("/").get(protectUser, fetchChannels);
router.route("/togglepin/:channelId").post(protectUser, togglePin);

module.exports = router;
