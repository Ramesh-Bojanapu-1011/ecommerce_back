const jwt =require("jsonwebtoken")

const generate_Token=(id)=>
    {
        return jwt.sign({id},process.env.jwt_sckrit,{expiresIn:"3d"});
    };
module.exports={generate_Token}