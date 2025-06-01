const express = require("express");
const {
    allUsers, searchUsers, getUserById, registerUser, loginUser, updateUser,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/all").get(protect, allUsers);
router.route("/search").get(protect, searchUsers);
router.route("/one/:userId").get(getUserById);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/update").put(protect, updateUser);

module.exports = router;