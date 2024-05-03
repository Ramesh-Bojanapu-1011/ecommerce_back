const { generate_Token } = require("../config/jwtTocken");
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
    const new_user = await usermodel.create(req.body);

    res.json({ status: 200, data: new_user });

    // res.json({ msg: "user created successfully" });
  }
});

const login_User_Controle = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user_details = {
    email: email,
    password: password,
  };

  console.log(user_details);
  const user = await usermodel.findOne({ email: email });
  if (user && (await user.is_password_is_matched(password))) {
    res.json({
      status: 200,
      message: "login successfully",
      data: {
        _id: user?._id,
        Fist_name: user?.Fist_name,
        Last_name: user?.Last_name,
        mobile: user?.mobile,
        email: user?.email,
        password: password,
        tocken: generate_Token(user?._id),
      },
    });
    // res.json({"status":200,"message":"login successfully","data":user_details});
  } else res.json({ status: 400, message: "login failed", data: user_details });
});

const get_all_users = asyncHandler(async (req, res) => {
  try {
    const getAllUsers = await usermodel.find();
    res.json(getAllUsers);
  } catch (error) {
    throw new Error({ status: 400, message: error });
  }
});

const delete_user = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const getauser = await usermodel.findByIdAndDelete(id);
    res.json({ getauser });
  } catch (error) {
    throw new Error({ status: 400, message: error });
  }
});

const get_single_user = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const getauser = await usermodel.findById(id);
    res.json({ getauser });
  } catch (error) {
    throw new Error({ status: 400, message: error });
  }
});

const update_user = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const UpdateUser = await usermodel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.json({ UpdateUser });
  } catch (error) {
    throw new Error({ status: 400, message: error });
  }
});

module.exports = {
  createUser,
  login_User_Controle,
  get_all_users,
  delete_user,
  get_single_user,
  update_user,
};
