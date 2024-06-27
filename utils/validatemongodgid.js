const mongooos =require('mongoose')
const validate_mongoos_id=(id)=>{
    const isvalid=mongooos.Types.ObjectId.isValid(id);
    if (!isvalid) throw new Error("this statement is not valid or not found");
}

module.exports=validate_mongoos_id;