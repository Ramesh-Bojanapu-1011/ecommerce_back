const express = require('express');
const {
  createProduct,
  getaProduct,
  get_all_products,
  add_product_to_cart,
  updateProduct,
  deleteProduct,
} = require('../contoller/productcontroler');
const { isAdmin, authMiddleware } = require('../middlewares/authmiddleware');
const router = express.Router();

router.get('/all', get_all_products);
router.get('/getproduct/:id', getaProduct);

router.post('/create_product', authMiddleware, isAdmin, createProduct);
router.put('/update/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/delete/:id', authMiddleware, isAdmin, deleteProduct);
// router.post("/addcart", add_product_to_cart);

module.exports = router;
