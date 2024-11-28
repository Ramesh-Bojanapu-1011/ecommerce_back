const productmodel = require("../models/productmodel");
const asyncHandler = require("express-async-handler");


const createProduct = asyncHandler(async (req, res) => {
    try {
        const newproduct = await productmodel.create(req.body);
        res.json(newproduct);
    }
    catch (err) {
        throw new Error(err)
    }
});




module.exports = { createProduct }