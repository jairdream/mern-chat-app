const express = require("express");
const {
  addHistory,
  allHistories,
} = require("../controllers/historyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:userId").get(protect, allHistories);
router.route("/").post(protect, addHistory);

module.exports = router;