const usermodel = require("../models/usermodel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const mobile = req.body.mobile;
  const user = await usermodel.findOne({ email: email });
  const user_mobile = await usermodel.findOne({ mobile: mobile });
  if (user && user_mobile) {
    throw new Error(
      `user already exists ${user.email} and ${user_mobile.mobile}`
    );
  }

  if (user_mobile || user) {
    if (user_mobile) {
      throw new Error(`user already exists ${user_mobile.mobile}`);
    } else {
      throw new Error(`user already exists ${user.email}`);
    }
  } else {
    const new_user=await usermodel.create(req.body);
    
    res.json({ status:200,data: new_user });

    // res.json({ msg: "user created successfully" });
  }
});

module.exports = { createUser };
