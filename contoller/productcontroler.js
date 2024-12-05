const productmodel = require("../models/productmodel");
const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const newproduct = await productmodel.create(req.body);
    res.json(newproduct);
  } catch (err) {
    throw new Error(err);
  }
});

/* The `getaProduct` function is an asynchronous handler that retrieves a product by its ID. */
const getaProduct = asyncHandler(async (req, res) => {
  try {
    const product = await productmodel.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "product not found" });
    }
    res.json(product);
  } catch (err) {
    throw new Error(err);
  } 
});

module.exports = { createProduct, getaProduct };
