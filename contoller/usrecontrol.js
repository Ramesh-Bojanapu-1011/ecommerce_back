const { generate_Token } = require("../config/jwtTocken");
const usermodel = require("../models/usermodel");
const asyncHandler = require("express-async-handler");
const validate_mongoos_id = require("../utils/validatemongodgid");
const { generate_Refresh_Token } = require("../config/RefreshTocan");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailcontroler");
const crypto = require("crypto");

/* The `createUser` function is responsible for creating a new user in the system. Here is a breakdown
of what the function does: */
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const mobile = req.body.mobile;
  const user = await usermodel.findOne({ email: email });
  const user_mobile = await usermodel.findOne({ mobile: mobile });
  if (user && user_mobile) {
    throw new Error(
      `user already exists ${user.email} and ${user_mobile.mobile}`,
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

/* The `login_User_Controle` function is responsible for handling the login process for a user. Here is
a breakdown of what the function does: */
const login_User_Controle = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user_details = {
    email: email,
    password: password,
  };
  const user = await usermodel.findOne({ email: email });
  if (!user) {
    throw new Error("User not found");
  }
  if (user && (await user.is_password_is_matched(password))) {
    const refreshToken = generate_Refresh_Token(user?._id);
    const update_user = await usermodel.findByIdAndUpdate(
      user.id,
      {
        refreshToken: refreshToken,
      },
      { new: true },
    );
    console.log(update_user);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
      secure: true,
    });
    res.json({
      status: 200,
      message: "login successfully",
      data: {
        _id: user?._id,
        Fist_name: user?.Fist_name,
        Last_name: user?.Last_name,
        mobile: user?.mobile,
        email: user?.email,
        role: user?.role,
        password: password,
        tocken: generate_Token(user?._id),
      },
    });
    // res.json({"status":200,"message":"login successfully","data":user_details});
  } else res.json({ status: 400, message: "login failed", data: user_details });
});

/* The `get_all_users` function is responsible for fetching all users from the database. Here is a
breakdown of what the function does: */
const get_all_users = asyncHandler(async (req, res) => {
  try {
    const getAllUsers = await usermodel.find();
    res.json(getAllUsers);
  } catch (error) {
    throw new Error({ status: 400, message: error });
  }
});

/* The `delete_user` function is responsible for deleting a user from the database based on the
provided user ID. Here is a breakdown of what the function does: */
const delete_user = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validate_mongoos_id(id);
  console.log(req.params);
  try {
    const deleateduser = await usermodel.findByIdAndDelete(id);
    if (!deleateduser) {
      throw new Error({ status: 404, message: error });
    }
    res.json({ deleateduser: deleateduser });
  } catch (error) {
    throw new Error({ status: 400, message: error });
  }
});

/* The `get_single_user` function is responsible for fetching a single user from the database based on
the provided user ID. Here is a breakdown of what the function does: */
const get_single_user = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validate_mongoos_id(id);
  console.log(req.params);
  try {
    const getauser = await usermodel.findById(id);
    res.json({ getauser });
  } catch (error) {
    throw new Error({ status: 400, message: error });
  }
});

/* The `handle_refresh_token` function is responsible for handling the refresh token process. Here is a
breakdown of what the function does: */
const handle_refresh_token = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error(" No refresh tokuen in cookie");
  const refreshToken = cookie.refreshToken;
  const user = await usermodel.findOne({ refreshToken });
  if (!user) throw new Error(" No refresh token in db or not matched ");
  jwt.verify(refreshToken, process.env.jwt_sckrit, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error(" invalid refresh token");
    }
    const token = generate_Token(user?._id);
    res.json({ token });
  });
});

/* The `handlelogout` function is responsible for logging out a user from the system. Here is a
breakdown of what the function does: */
const handlelogout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error(" No refresh tokuen in cookie");
  const refreshToken = cookie.refreshToken;
  const user = await usermodel.findOne({ refreshToken });
  if (!user) throw new Error(" No refresh token in db or not matched ");
  // const newRefreshToken = generate_Token(user._id);
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.json({ message: "Logged out successfully" });
});

/* The `update_user` function is responsible for updating a user's information in the database based on
the provided user ID. Here is a breakdown of what the function does: */
const update_user = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validate_mongoos_id(id);
  try {
    const UpdateUser = await usermodel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      },
    );
    res.json({ UpdateUser });
  } catch (error) {
    throw new Error({ status: 400, message: error });
  }
});

/* The `block_user` function is responsible for updating a user's `isBlocked` status to `true` in the
database based on the provided user ID. It first extracts the `id` from the request parameters,
validates the `id` using the `validate_mongoos_id` function, and then attempts to update the user's
`isBlocked` status to `true` using `usermodel.findByIdAndUpdate`. If the update is successful, it
returns the updated user object with the `isBlocked` set to `true`. If there is an error during the
process, it throws an error with status code 400 and the error message. */
const block_user = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validate_mongoos_id(id);
  try {
    const BlockedUser = await usermodel.findByIdAndUpdate(
      id,
      {
        $set: {
          isBlocked: true,
        },
      },
      {
        new: true,
      },
    );
    res.json({ blockUser: BlockedUser });
  } catch (error) {
    throw new Error({ status: 400, message: error });
  }
});

/* The `unblock_user` function is responsible for updating a user's `isBlocked` status to `false` in
the database based on the provided user ID. Here is a breakdown of what the function does: */
const unblock_user = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validate_mongoos_id(id);
  try {
    const UnblockedUser = await usermodel.findByIdAndUpdate(
      id,
      {
        $set: {
          isBlocked: false,
        },
      },
      {
        new: true,
      },
    );
    res.json({ blockUser: UnblockedUser });
  } catch (error) {
    throw new Error({ status: 400, message: error });
  }
});

/* The `forgot_password` function is responsible for generating a password reset token for a user and
saving it in the database. Here is a breakdown of what the function does: */
const forgot_password = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await usermodel.findOne({ email: email });
  if (!user) throw new Error("User not found");
  const token = await user.createPasswordRestToken();
  await user.save();
  const resetUrl = `${process.env.FRONTEND_URL}/api/user/reset-password-token/${token}`;
  const html = `You password reset link is: <a href='${resetUrl}'>Click here</a> <br/>
  and expires at ${user.passwordResetExpires}`;
  const data = {
    to: user.email,
    subject: "Password reset token",
    message: "Your password reset token",
    html: html,
  };
  try {
    sendEmail(data);
    res.json({ message: "Email sent", token: token });
  } catch (error) {
    throw new Error(error);
  }
});

/* The `reset_password` function is responsible for updating a user's password based on the provided
password reset token. Here is a breakdown of what the function does: */
const reset_password = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await usermodel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user)
    throw new Error("Token is invalid or has expired, please try again");

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json({ message: "Password reset successfully", user: user });
});

/* The `updatePassword` function is responsible for updating a user's password in the database based on
the provided user ID. Here is a breakdown of what the function does: */
const updatePassword = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;
  validate_mongoos_id(id);
  const user = await usermodel.findById(id);

  if (!user) throw new Error("User not found");
  if (password) {
    user.password = password;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } else {
    throw new Error("Password not updated");
  }

  // res.json({ message: "Password updated successfully" }, user);
});

/* The `module.exports` statement in the JavaScript code snippet is exporting an object that contains
references to various functions defined in the file. By exporting these functions, they become
accessible to other parts of the application that import this file. Each function corresponds to a
specific operation related to user management in the system: */
module.exports = {
  createUser,
  login_User_Controle,
  get_all_users,
  delete_user,
  get_single_user,
  update_user,
  unblock_user,
  block_user,
  handle_refresh_token,
  handlelogout,
  updatePassword,
  reset_password,
  forgot_password,
};
