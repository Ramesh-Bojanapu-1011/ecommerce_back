const usermodel = require("../models/usermodel");

const createUser=async(req,res)=>{
    const email=req.body.email
    const mobile=req.body.mobile
    const user=await usermodel.findOne({email:email})
    const user_mobile=await usermodel.findOne({mobile:mobile})

    if(user||user_mobile){
        res.send({"msg":`user already exists ${user_mobile}`})
    }
    else{
        usermodel.create(req.body)
        
        res.json({msg:"user created successfully"})
    }
    
}

module.exports={createUser};
