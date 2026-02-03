const express=require("express")
const notemodal=require("./modals/notes.model")

const app=express()
app.use(express.json())

// post methode

app.post("/notes", async(req,res)=>{
    const { title,description }= req.body

    const notes =await notemodal.create({
        title,description
    })
     
res.status(201).json({
    message:"note created successfully",
       notes: notes
})
    })

    app.get("/notes", async(req,res)=>{
   const notes= await notemodal.find()

     res.status(200).json({
          message:"notes get successfully", notes: notes
     })
    })







module.exports=app