const Cart = require("../models/Cart");
const { sendResponseError } = require("../middleware/middleware");

const getCartProducts = async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.user._id }).populate(
      "productId",
    );
    // console.log(carts)
    res.status(200).send({ status: "ok", carts });
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};

const addProductInCart = async (req, res) => {
  const { productId, count } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { productId, userId: req.user._id },
      { productId, count, userId: req.user._id },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    res.status(201).send({ status: "ok", cart });
  } catch (err) {
    console.log(err);
    sendResponseError(500, `Error ${err}`, res);
  }
};
const deleteProductInCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.status(200).send({ status: "ok" });
  } catch (e) {
    console.log(e);
    sendResponseError(500, `Error ${e}`, res);
  }
};

const deleteProductInCartByProductId = async (req, res) => {
  try {
    await Cart.findOneAndDelete({
      productId: req.params.productId,
      userId: req.user._id,
    });
    res.status(200).send({ status: "ok" });
  } catch (e) {
    console.log(e);
    sendResponseError(500, `Error ${e}`, res);
  }
};

module.exports = {
  addProductInCart,
  deleteProductInCart,
  deleteProductInCartByProductId,
  getCartProducts,
};
