const express=require('express');
const router=express.Router();
const {createUser} = require("../contoller/usrecontrol");


router.post('/register',createUser)


module.exports=router;