const { generate_Token } = require("../config/jwtTocken");
const usermodel = require("../models/usermodel");
const asyncHandler = require("express-async-handler");
const validate_mongoos_id = require("../utils/validatemongodgid");

/* The `createUser` function is responsible for creating a new user in the system. Here is a breakdown
of what the function does: */
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

/* The `login_User_Controle` function is responsible for handling the login process for a user. Here is
a breakdown of what the function does: */
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

/* The `get_all_users` function is responsible for fetching all users from the database. Here is a
breakdown of what the function does: */
const get_all_users = asyncHandler(async (req, res) => {
  try {
    const getAllUsers = await usermodel.find();
    res.json(getAllUsers);
    console.log(getAllUsers);
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
    const getauser = await usermodel.findByIdAndDelete(id);
    res.json({ getauser });
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
      }
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
    const blockUser = await usermodel.findByIdAndUpdate(
      id,
      {
        $set: {
          isBlocked: true,
        },
      },
      {
        new: true,
      }
    );
    res.json({ blockUser });
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
    const blockUser = await usermodel.findByIdAndUpdate(
      id,
      {
        $set: {
          isBlocked: false,
        },
      },
      {
        new: true,
      }
    );
    res.json({ blockUser });
  } catch (error) {
    throw new Error({ status: 400, message: error });
  }
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
};
