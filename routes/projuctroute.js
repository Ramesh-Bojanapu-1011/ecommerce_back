const express = require("express");
const { createProduct, getaProduct } = require("../contoller/productcontroler");
const router = express.Router();

router.post("/", createProduct);
router.post("/getproduct/:id", getaProduct);


module.exports = router;