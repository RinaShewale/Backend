const express=require("express")
const authrouter=require("./route/authroute")
const cookie=require("cookie-parser")
const cookieParser = require("cookie-parser")


const app=express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authrouter)




module.exports=app