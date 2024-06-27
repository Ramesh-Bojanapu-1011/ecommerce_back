const mongooos =require('mongoose')
/**
 * The function `validate_mongoos_id` checks if a given ID is a valid MongoDB ObjectID and throws an
 * error if it is not valid.
 * @param id - The `id` parameter is a value that is supposed to represent a MongoDB ObjectId.
 */
const validate_mongoos_id=(id)=>{
    const isvalid=mongooos.Types.ObjectId.isValid(id);
    if (!isvalid) throw new Error("this statement is not valid or not found");
}

module.exports=validate_mongoos_id;