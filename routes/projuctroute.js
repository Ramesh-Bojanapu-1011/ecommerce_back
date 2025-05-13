const express = require("express");
const {
  createProduct,
  getaProduct,
  get_all_products,
  add_product_to_cart,
  updateProduct,
  deleteProduct,
  add_product_to_wishlist,
  remove_product_to_wishlist,
  remove_product_from_cart,
} = require("../contoller/productcontroler");
const { isAdmin, authMiddleware } = require("../middlewares/authmiddleware");
const router = express.Router();

router.get("/all", get_all_products);
router.get("/getproduct/:id", getaProduct);

router.post("/add_product_to_cart", authMiddleware, add_product_to_cart);
router.post(
  "/remove_product_from_cart",
  authMiddleware,
  remove_product_from_cart,
);

router.post("/create_product", authMiddleware, isAdmin, createProduct);
router.put("/update/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteProduct);
router.post(
  "/add_product_to_wishlist",
  authMiddleware,
  add_product_to_wishlist,
);
router.post(
  "/remove_product_to_wishlist",
  authMiddleware,
  remove_product_to_wishlist,
);

module.exports = router;
