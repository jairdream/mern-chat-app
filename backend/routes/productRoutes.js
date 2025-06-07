const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protectUser, protectAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protectAdmin, createProduct);
router.route("/").get(protectUser, getProducts);
router.route("/:id").get(protectUser, getProductById);
router.route("/:id").put(protectAdmin, updateProduct);
router.route("/:id").delete(protectAdmin, deleteProduct);

module.exports = router;