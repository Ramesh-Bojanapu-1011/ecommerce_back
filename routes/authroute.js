const express = require("express");
const router = express.Router();
const {
  createUser,
  login_User_Controle,
  get_all_users,
  update_user,
  delete_user,
  get_single_user,
} = require("../contoller/usrecontrol");
const {authMiddleware} = require("../middlewares/authmiddleware");

router.post("/register", createUser);
router.post("/login", login_User_Controle);
router.get("/all_users", get_all_users);
router.delete("/delete/:id", delete_user);
router.get('/get-user-details/:id',get_single_user)
router.put("/upade-user/:id", update_user);
router.get("/user-type/:id", authMiddleware, get_single_user);

module.exports = router;
