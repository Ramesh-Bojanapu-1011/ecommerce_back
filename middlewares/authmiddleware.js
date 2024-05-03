const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.jwt_sckrit);
        const user_type = await User.findById(decoded?.id);
        console.log(decoded);
        res.json({user_type})
        // next();
      }
    } catch (error) {
      throw new Error("not authorized token expired");
    }
  } else {
    throw new Error("not authorized token expired");
  }
});

module.exports = { authMiddleware };
