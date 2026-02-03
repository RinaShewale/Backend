const express= require("express")
const notemodal=require("./config/modal/note.modal")
const cors=require("cors")
const app= express()

app.use(cors())
app.use(express.json())

app.post("/api/notes", async (req,res)=>{
    const{title,description}=req.body
    const notes=await notemodal.create({
        title,description
    })

    res.status(201).json({
      message: "Note is created",
      notes,
    });
})

app.get("/api/notes", async(req,res)=>{
    const notes=await notemodal.find()

    res.status(200).json({
        message:"notes are fetched",
        notes
    })
})


 app.delete("/api/notes/:id", async(req,res)=>{
        const id= req.params.id
    const note=await notemodal.findByIdAndDelete(id)



     res.status(200).json({
        message:"note are deleted"
    })
 })

 app.patch("/api/notes/:id", async (req,res)=>{
    const id = req.params.id;
    const { description } = req.body;
    
    const note = await notemodal.findByIdAndUpdate(id, { description }); 

     res.status(200).json({
        message:"note is modified",
        note
    })
 })
 

module.exports=app