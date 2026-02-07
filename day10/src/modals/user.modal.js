const mongoose=require("mongoose")

const userschema = new mongoose.Schema(
    {
        name:String,
        email:{
            type:String,
            unique:[true,"with this email user account is already exist"]
        },
        password:String
    }
)

const usermodal=mongoose.model("user",userschema)

module.exports=usermodal