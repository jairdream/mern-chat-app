const express = require("express");
const {
  accessChannel,
  fetchChannels,
} = require("../controllers/channelControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChannel);
router.route("/").get(protect, fetchChannels);

module.exports = router;
