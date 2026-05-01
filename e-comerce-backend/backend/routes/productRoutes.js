const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
} = require("../controller/productControllers");
const { verifyUser } = require("../middleware/middleware");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", verifyUser, createProduct);

module.exports = router;
