const Product = require("../models/Product");
const { sendResponseError } = require("../middleware/middleware");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createProduct = async (req, res) => {
  const { name, description, price, countInStock, imageUrl } = req.body;
  try {
    // Check if admin
    if (!req.user || !req.user.isAdmin) {
      sendResponseError(403, "Only admin can add products", res);
      return;
    }

    const product = await Product.create({
      name,
      description,
      price,
      countInStock,
      imageUrl,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    sendResponseError(500, "Error creating product", res);
  }
};

const updateProduct = async (req, res) => {
  const { name, description, price, countInStock, imageUrl } = req.body;
  const { id } = req.params;
  try {
    // Check if admin
    if (!req.user || !req.user.isAdmin) {
      sendResponseError(403, "Only admin can update products", res);
      return;
    }

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        countInStock,
        imageUrl,
      },
      { new: true, runValidators: true },
    );

    if (!product) {
      sendResponseError(404, "Product not found", res);
      return;
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    sendResponseError(500, "Error updating product", res);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
};
