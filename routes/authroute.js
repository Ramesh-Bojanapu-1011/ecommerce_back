const express=require('express');
const router=express.Router();
const {createUser, login_User_Controle} = require("../contoller/usrecontrol");



router.post('/register',createUser)
router.post('/login',login_User_Controle)



module.exports=router;