import express  from "express";
import {User,validate} from "../models/user.js"
import bcrypt from "bcrypt"

const router=express.Router()

router.post('./',async (req,res)=>{
  try {
    const{error}=validate(req.body);
    if(error)
      return res.status(400).send({message:error.details[0].message})
    
    const user=await User.findOne({email:req.body.email})  

    if(user)
      return res.status(409).send({message:"User with given email exists "})

    const salt= await bcrypt.genSalt(Number(process.env.SALT))

    const hashPassword=await bcrypt.hashPassword(req.body.password,salt)

    await new User({...req.body,password:hashPassword}).save();
    res.status(201).send({message:"user created successfully"})

  } catch (error) {
    
    res.status(500).send({message:"Internal server error"})

  }

})

// module.export= router
export default router

