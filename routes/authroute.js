const express=require('express');
const router=express.Router();
const {createUser, login_User_Controle, get_all_users, get_single_user, update_user} = require("../contoller/usrecontrol");



router.post('/register',createUser)
router.post('/login',login_User_Controle)
router.get('/all_users',get_all_users)
router.get("/:id",get_single_user)
router.get("/upade-user/:id",update_user)






module.exports=router;