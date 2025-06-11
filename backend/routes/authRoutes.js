const express = require("express");
const {
    allUsers, searchUsers, getUserById, registerUser, loginUser, updateUser,
    refreshSign,
    adminUser,
    verifyUser,
    resendCode,
} = require("../controllers/authControllers");
const { protect, protectUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/admin").get(adminUser);
router.route("/all").get(protectUser, allUsers);
router.route("/search").get(protectUser, searchUsers);
router.route("/one/:userId").get(getUserById);
router.route("/register").post(registerUser);
router.route("/resendcode").post(protect, resendCode);
router.route("/verify").post(protect, verifyUser);
router.route("/login").post(loginUser);
router.route("/update").put(protectUser, updateUser);
router.route("/refresh").post(protectUser, refreshSign);

module.exports = router;