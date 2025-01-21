const productmodel = require('../models/productmodel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

/* The `createProduct` function is an asynchronous handler that creates a new product in the database. */
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newproduct = await productmodel.create(req.body);
    res.json(newproduct);
  } catch (err) {
    throw new Error(err);
  }
});

/* The `updateProduct` function is an asynchronous handler that updates a product in the database.
Here's a breakdown of what the function does: */
const updateProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await productmodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updateProduct);
  } catch (err) {
    throw new Error(err);
  }
});

/* The `deleteProduct` function is an asynchronous handler that deletes a product from the database
based on the provided ID. Here's a breakdown of what the function does: */
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    await productmodel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    throw new Error(err);
  }
});

/* The `getaProduct` function is an asynchronous handler that retrieves a product by its ID. */
const getaProduct = asyncHandler(async (req, res) => {
  try {
    const product = await productmodel.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'product not found' });
    }
    res.json(product);
  } catch (err) {
    throw new Error(err);
  }
});

/* The `get_all_products` function is an asynchronous handler that retrieves all products from the
database using the `productmodel.find()`.*/
const get_all_products = asyncHandler(async (req, res) => {
  console.log();
  try {
    // filtering
    const queryobj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryobj[el]);
    console.log(queryobj);
    let queryStr = JSON.stringify(queryobj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // gte=Greater than or equal to |gt =Greater than |lte= Less than or equal to |lt =Less than
    console.log(JSON.parse(queryStr));
    let query = productmodel.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Limiting fields
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   query = query.select(fields);
    // } else {
    //   query = query.select("__v");
    // }

    // Pagenation
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const count = await productmodel.countDocuments();
      if (skip >= count) {
        throw new Error('this page is does not exist');
      }
    } else {
      res.json(await query);
    }
    console.log(page, limit, skip);

    //Output
    const getallProducts = await query;
    res.json(getallProducts);
  } catch (err) {
    throw new Error(err);
  }
});

/* The `add_product_to_cart` function is an asynchronous handler that adds a product to a user's cart
in the database. Here is a breakdown of what the function does: */
const add_product_to_cart = asyncHandler(async (req, res) => {
  try {
    const product = await productmodel.findById(req.body.productId);
    // console.log("product", product);
    if (!product) {
      res.status(404).json({ message: 'product not found' });
    }
    const cart = await req.user.cart;
    const productInCart = cart.products.find(
      (productInCart) =>
        productInCart.productId.toString() === req.body.productId.toString()
    );
    if (productInCart) {
      productInCart.quantity += req.body.quantity;
      await cart.save();
      res.json({ message: 'product added to cart' });
    } else {
      cart.products.push({
        productId: req.body.productId,
        quantity: req.body.quantity,
      });
      await cart.save();
      res.json({ message: 'product added to cart' });
    }
  } catch (err) {
    throw new Error(err);
  }
});

/* The `cart_products` function is an asynchronous handler that retrieves the products in a user's cart
from the database. */
const cart_products = asyncHandler(async (req, res) => {
  try {
    const cart = await req.user.cart;
    res.json(cart.products);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createProduct,
  getaProduct,
  get_all_products,
  add_product_to_cart,
  cart_products,
  updateProduct,
  deleteProduct,
};
