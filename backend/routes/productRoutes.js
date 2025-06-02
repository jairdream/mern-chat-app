const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createProduct);
router.route("/").get(protect, getProducts);
router.route("/:id").get(protect, getProductById);
router.route("/:id").put(protect, updateProduct);
router.route("/:id").delete(protect, deleteProduct);

module.exports = router;