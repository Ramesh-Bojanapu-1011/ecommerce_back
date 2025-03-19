const express = require("express");
const router = express.Router();
const {
  createUser,
  login_User_Controle,
  get_all_users,
  update_user,
  delete_user,
  get_single_user,
  block_user,
  unblock_user,
  handle_refresh_token,
  handlelogout,
  updatePassword,
  forgot_password,
  reset_password,
} = require("../contoller/usrecontrol");
const { authMiddleware, isAdmin } = require("../middlewares/authmiddleware");

/* This code snippet is defining various routes using the Express Router in a Node.js application.
Here's a breakdown of what each route is doing: */
router.post("/register", createUser);
router.post("/login", login_User_Controle);
router.get("/all_users", get_all_users);
router.get("/refresh", handle_refresh_token);
router.delete("/delete/:id", delete_user);
router.post("/update-password", authMiddleware, updatePassword);
router.post("/forgot-password", forgot_password);
router.post("/reset-password-token/:token", reset_password);
router.get("/get-user-details/:id", get_single_user);
router.put("/update-user/:id", update_user, authMiddleware);
router.post("/user-type/:id", authMiddleware, isAdmin, get_single_user);
router.post("/block-user/:id", block_user, isAdmin, authMiddleware);
router.post("/unblock-user/:id", unblock_user, isAdmin, authMiddleware);
router.get("/logout", handlelogout);

module.exports = router;
