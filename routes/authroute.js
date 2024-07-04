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
} = require("../contoller/usrecontrol");
const { authMiddleware, isAdmin } = require("../middlewares/authmiddleware");

/* This code snippet is defining various routes using the Express Router in a Node.js application.
Here's a breakdown of what each route is doing: */
router.post("/register", createUser);
router.post("/login", login_User_Controle);
router.get("/all_users", get_all_users);
router.delete("/delete/:id", delete_user);
router.get("/get-user-details/:id", get_single_user);
router.put("/update-user/:id", update_user, authMiddleware);
router.get("/user-type/:id", authMiddleware, isAdmin, get_single_user);
router.get("/block-user/:id", block_user, isAdmin, authMiddleware);
router.get("/unblock-user/:id", unblock_user, isAdmin, authMiddleware);

module.exports = router;
