const express = require("express");
const {
  addProductInCart,
  deleteProductInCart,
  deleteProductInCartByProductId,
  getCartProducts,
} = require("../controller/cart.controller");
const { verifyUser } = require("../middleware/middleware");
const router = express.Router();

router
  .route("/")
  .get([verifyUser], getCartProducts)
  .post([verifyUser], addProductInCart);

router
  .route("/product/:productId")
  .delete([verifyUser], deleteProductInCartByProductId);

router.route("/:id").delete([verifyUser], deleteProductInCart);

module.exports = router;
