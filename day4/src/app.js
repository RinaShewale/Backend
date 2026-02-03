const express=require("express")

const app=express()
app.use(express.json())

const notes=[]

app.post("/notes",(req,res)=>{
    notes.push(req.body) 
     console.log(req.body);
    res.send("note created")
})

app.get("/notes",(req,res)=>{
    console.log(notes); 
    res.send(notes)
})

app.delete("/notes/:index",(req,res)=>{
    console.log(req.params.index);
    
})




app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].description= req.body.description;
    notes[req.params.index].title= req.body.title;
    res.send("note modifie")
})

module.exports = app