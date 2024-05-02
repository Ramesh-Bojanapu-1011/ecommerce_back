const usermodel = require("../models/usermodel");

const createUser=async(req,res)=>{
    const email=req.body.email
    const user=await usermodel.findOne({email:email})
    if(user){
        res.send({"msg":"user already exists"})
    }
    else{
        const newuser=usermodel.create(req.body)
        
        res.json({msg:"user created successfully",newuser})
    }
    
}

module.exports={createUser};