const express = require("express");
const { createProduct } = require("../contoller/productcontroler");
const router = express.Router();

router.post("/", createProduct);


module.exports = router;