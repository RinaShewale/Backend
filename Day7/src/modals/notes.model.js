const mongoose=require("mongoose")


const noteschema= new mongoose.Schema({
    title:String,
    description:String
})

const notemodal= mongoose.model("notes",noteschema)

module.exports = notemodal