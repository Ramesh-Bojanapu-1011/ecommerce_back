const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    Fist_name:{
        type:String,
        required:true,
        
    },
    Last_name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});


userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})
userSchema.methods.is_password_is_matched=async function(entred_password){
    return await bcrypt.compare(entred_password,this.password);
}

//Export the model
module.exports = mongoose.model('User', userSchema);