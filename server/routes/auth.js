import express from "express"
import joi from "joi";
import bcrypt from "bcrypt"
import {User} from "../models/user.js"

const router = express.Router();


router.post("/",async (req, res)=>{

  try {
    
    const {error}= validate(req.body)
    if(error)
      return res.status(400).send({message:error.details[0].message})

    const user= await User.findOne({email:req.body.email})

    if(!user)
      return res.send.status(401).send({message:"invalid email or password"})

    const validPassword = await bcrypt.compare(
      req.body.password, User.password
    ) 

    const token =user.generateAuthToken();
    res.status(200).send({data:token, message:'Logged in successfully'})
    
    if(!validPassword)
      return res.send.status(401).send({message:"invalid email or password"})

  } catch (error) {

    res.status(500).send({message:"Internal server error"})
    
  }

})

const validate=(data)=>{

  const schema=joi.object({
    email:joi.string().email().required().label("email"),
    password:joi.string().password().required().label("password")
  })

  return schema.validate(data)
}


// module.export =router

export default router
