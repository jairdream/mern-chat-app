const express = require("express");
const {
  addHistory,
  allHistories,
} = require("../controllers/historyController");
const { protectUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:userId").get(protectUser, allHistories);
router.route("/").post(protectUser, addHistory);

module.exports = router;