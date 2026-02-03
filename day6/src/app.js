const express=require("express")


const app=express()


app.get("/",(req,res)=>{
    console.log("getting req");
    
})

module.exports=app