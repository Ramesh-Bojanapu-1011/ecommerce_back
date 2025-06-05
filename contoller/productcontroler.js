const productmodel = require('../models/productmodel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const usermodel = require('../models/usermodel');

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
  try {
    // Filtering
    const queryobj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryobj[el]);

    // Convert query to MongoDB format
    const mongoQuery = {};
    Object.keys(queryobj).forEach((key) => {
      // gte=Greater than or equal to ||gt =Greater than ||lte= Less than or equal to ||lt =Less than
      if (/\b(gte|gt|lte|lt)\b/.test(key)) {
        // Extract field name and operator
        const [field, operator] = key.split('[');
        const cleanOperator = `$${operator.replace(']', '')}`;

        if (!mongoQuery[field]) {
          mongoQuery[field] = {};
        }
        mongoQuery[field][cleanOperator] = Number(queryobj[key]); // Convert value to number
      } else {
        mongoQuery[key] = queryobj[key];
      }
    });

    console.log('mongoQuery', mongoQuery);

    let query = productmodel.find(mongoQuery);

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const totalDocuments = await productmodel.countDocuments();

    if (skip >= totalDocuments) {
      return res.status(404).json({ message: 'This page does not exist' });
    }

    // Execute Query
    const getallProducts = await query;
    res.json({ total: totalDocuments, page, limit, data: getallProducts });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* The `add_product_to_cart` function is an asynchronous handler that adds a product to a user's cart
in the database. Here is a breakdown of what the function does: */
const add_product_to_cart = asyncHandler(async (req, res) => {
  try {
    const product = await productmodel.findById(req.body.productId);
    if (!product) {
      res.status(404).json({ message: 'product not found' });
    }
    const Logeduser = await usermodel.findById(req?.user?.id);
    // console.log(Logeduser);
    const cart = Logeduser.cart;
    console.log(cart);

    // Check if the product is already in the cart
    const productInCart = cart.find(
      (productInCart) =>
        productInCart.productId.toString() === req.body.productId.toString()
    );
    console.log(productInCart);
    if (productInCart) {
      productInCart.quantity += req.body.quantity;
      await Logeduser.save();
      res.json({ message: 'product added to cart' });
    } else {
      cart.push({
        productId: req.body.productId,
        quantity: req.body.quantity
      });
      await Logeduser.save();
      res.json({ message: 'product added to cart' });
    }
  } catch (err) {
    throw new Error(err);
  }
});

/* The `remove_product_from_cart` function is an asynchronous handler that remove a product to a user's cart
in the database.*/
const remove_product_from_cart = asyncHandler(async (req, res) => {
  try {
    const product = await productmodel.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const Logeduser = await usermodel.findById(req?.user?.id);
    const productExists = Logeduser.cart.find(
      (item) => item.productId.toString() === req.body.productId.toString()
    );
    if (productExists) {
      Logeduser.cart = Logeduser.cart.filter(
        (item) => item.productId.toString() !== req.body.productId.toString()
      );
      await Logeduser.save();
      return res.json({ message: 'Product removed from cart' });
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    throw new Error(error);
  }
});

/* The `cart_products` function is an asynchronous handler that retrieves the products in a user's cart
from the database. */
const cart_products = asyncHandler(async (req, res) => {
  try {
    const cart = await req?.user?.cart;
    res.json(cart);
  } catch (err) {
    throw new Error(err);
  }
});

/* The `add_product_to_wishlist` function is an asynchronous handler that adds a product to a user's
wishlist in the database. Here's a breakdown of what the function does: */
const add_product_to_wishlist = asyncHandler(async (req, res) => {
  try {
    const product = await productmodel.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const Logeduser = await usermodel.findById(req?.user?.id);
    if (!Logeduser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const productExists = Logeduser.wishlist.some(
      (item) => item?.toString() === req.body.productId.toString()
    );
    if (productExists) {
      return res.json({ message: 'Product already in wishlist' });
    }
    Logeduser.wishlist.push(req.body.productId);
    await Logeduser.save();

    return res.json({ message: 'Product added to wishlist' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

/* The `remove_product_to_wishlist` function is an asynchronous handler that removes a product from a
user's wishlist in the database. Here's a breakdown of what the function does: */
const remove_product_to_wishlist = asyncHandler(async (req, res) => {
  try {
    const product = await productmodel.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const Logeduser = await usermodel.findById(req?.user?.id);
    if (!Logeduser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const productExists = Logeduser.wishlist.some(
      (item) => item?.toString() === req.body.productId.toString()
    );
    if (productExists) {
      Logeduser.wishlist.pull(req.body.productId);
      await Logeduser.save();
    }
    return res.json({ message: 'Product removed to wishlist' });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createProduct,
  getaProduct,
  get_all_products,
  remove_product_to_wishlist,
  add_product_to_wishlist,
  add_product_to_cart,
  cart_products,
  updateProduct,
  deleteProduct,
  remove_product_from_cart
};
