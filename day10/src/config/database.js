const mongoose=require("mongoose")


function connecttoDb(){
    mongoose.connect(process.env.Mongo_URI)
    
    .then(()=>{
        console.log("database is connected");
        
    })
}


module.exports=connecttoDb;