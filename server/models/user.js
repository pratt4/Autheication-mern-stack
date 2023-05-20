import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import joi from "joi"
import PasswordComplexity  from "joi-password-complexity";
import dotenv from "dotenv"

dotenv.config()

const userSchema = new mongoose.Schema({
  firstName:{
    type :String,
    required:true
  },
  lastName:{
    type :String,
    required:true
  },
  email:{
    type :String,
    required:true
  },
  password:{
    type :String,
    required:true
  },
})

userSchema.methods.generateAuthToken= function (){

  const token=jwt.sign({_id:this._id},process.env.privatekey,{expiresIn:"7d"})

  return token;
}

 const User=mongoose.model('user',userSchema)

const validate=(data)=>{
  const schema=joi.object({
  firstName:joi.string().required().label("First Name"),
 lastName :joi.string().required().label("Last Name"),
  email:joi.string().required().label("Email"),
  password:PasswordComplexity().required().label("Password")

  });

  return schema.validate(data);
}

export {User, validate}
// module.export ={User, validate}


