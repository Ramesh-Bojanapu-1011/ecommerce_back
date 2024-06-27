const jwt =require("jsonwebtoken")

/**
 * The function `generate_Token` generates a JWT token with a specified `id` and expiration time of 3
 * days.
 * @param id - The `id` parameter is the unique identifier or user ID for which the token is being
 * generated.
 * @returns A JSON Web Token (JWT) is being returned with the user's ID embedded in it, which expires
 * in 3 days.
 */
const generate_Token=(id)=>
    {
        return jwt.sign({id},process.env.jwt_sckrit,{expiresIn:"3d"});
    };
module.exports={generate_Token}