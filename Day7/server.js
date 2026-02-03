

require("dotenv").config()
const connectdata=require("./src/config/database")

const app=require("./src/app")
 connectdata()


app.listen(3000,()=>{
    console.log("surver is running");
    
})