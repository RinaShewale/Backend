const express= require("express")
const notemodal=require("./notemodal/note.modal")


const app=express()

app.use(express.json())

app.post("/notes", async (req,res)=>{
    const{title,description}=req.body


    const note= await notemodal.create({
        title,description
    })

    res.status(201).json({
        message:"note created",note
    })
})


app.get("/notes", async (req,res)=>{

const note= await notemodal.find()

    res.status(200).json({
        message:"note are found",note
    })
})


app.patch("/notes/:id", async(req,res)=>{
    const id=req.params.id
    const {title,description}=req.body
    const note= await notemodal.findByIdAndUpdate(id,{title,description})


     res.status(200).json({
        message:"note are modified",note
    })

})


app.delete("/notes/:id",async(req,res)=>{
        const id=req.params.id

        const note= await notemodal.findByIdAndDelete(id)

 res.status(200).json({
        message:"note are deleted"
    })

})


module.exports=app