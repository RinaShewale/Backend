const express= require("express")
const notemodal=require("./config/modal/note.modal")
const cors=require("cors")
const app= express()
const path = require('path')


app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

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
    const {title}=req.body
    
    const note = await notemodal.findByIdAndUpdate(id, { description ,title}); 

     res.status(200).json({
        message:"note is modified",
        note
    })
 })

app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

 
module.exports=app