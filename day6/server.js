const app=require("./src/app")

const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://RinaShewale:LVB_E8zMA%40FeKjp@cluster0.mfnbetw.mongodb.net/")

.then(()=>{
    console.log("database connected");
    
})

app.listen(3000,()=>{
    console.log("server is running");
    
})