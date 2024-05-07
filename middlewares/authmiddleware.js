const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, _res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.jwt_sckrit);
        const user_type = await User.findById(decoded?.id);
        console.log(decoded);
        req.user = user_type;
        next();
      }
    } catch (error) {
      throw new Error("not authorized token expired");
    }
  } else {
    throw new Error("not authorized token");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const { email } = req.user;
  const Admin_user = await User.findOne({ email });
  if (Admin_user && Admin_user.role=="admin") {
    next();
  } else {
    res.status(401);
    throw new Error("not authorized as an admin");
  }
});

module.exports = { authMiddleware, isAdmin };

