
const express= require("express")
const app=express()

app.use(express.json()) 
const notes=[]

app.post("/notes",(req,res)=>{
  notes.push(req.body)
  console.log(req.body);
  
    res.status(201).json({
        message:"note created"
    })
    
})

app.delete("/notes/:index",(req,res)=>{
    delete notes[ req.params.index ]

    res.status(200).json({
        message:"note deleted"
    })
})

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description= req.body.description;
      notes[req.params.index].title= req.body.title;

    res.status(200).json({
        message:"modify"
    })
})


app.get("/notes",(req,res)=>{
    res.status(200).json(notes)
})

module.exports=app