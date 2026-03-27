const express = require("express")
const usermodal = require("../modals/user.modal")
const jwt =require("jsonwebtoken")
const crypto= require("crypto")

const authrouter = express.Router()



authrouter.post("/register", async (req, res) => {

    const {name, email, password } = req.body


     const isuserexist = await usermodal.findOne({ email })
    if (isuserexist) {
        return res.status(409).json({
            message: "email already exist"
        })
    }

    const hash= crypto.createHash("md5").update(password).digest("hex")

    const user = await usermodal.create({
        name, email, password:hash
    })
    
   const token=jwt.sign({
    id:user._id,
    email:user.email
   },process.env.JWT_SECRET)

   res.cookie("jwt_token",token)

    res.status(201).json({
        message: "user registed", user,token
    })
})

authrouter.post("/login",async(req,res)=>{

    const {email,password}=req.body

    const user= await usermodal.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"email is not correct"
        })
    }

    const ispassword= user.password===crypto.createHash("md5").update(password).digest("hex")

    if(!ispassword){
        return res.status(404).json({
            message:"password is not correct"
        })
    }

    const token= jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("jwt_token",token)

    res.status(200).json({
        message:"user logged in successfully",user
    })

})




authrouter.post("/protected" ,(req,res)=>{
   
    res.status(200).json({
        message:"route is protected"
    })
 })


 authrouter.post("/logout",async (req,res)=>{
 const {email,password}=req.body
 const user= await usermodal.findOne({email})

 if(!user){
    return res.status(404).json({
            message:"email is not correct we cannot log out your account"
        })
    }

      const ispassword= user.password===crypto.createHash("md5").update(password).digest("hex")

      if(!ispassword){
         return res.status(404).json({
            message:"password is not correct we cannot log out your account"
        })
      }
 

    res.clearCookie("jwt_token")

    res.status(200).json({
        message:"user logged out successfully"
    })
 })


module.exports = authrouter