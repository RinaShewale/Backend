import { useState } from 'react'
import axios from 'axios'



function App() {
 const [Notes, setNotes] = useState([])

 axios.get("http://localhost:3000/api/notes")
  .then((res)=>{
    console.log("res.data", res.data);
    setNotes(res.data.notes); 
  })
 

  return (
    <>

  <div className="notes">
    {Notes.map((note) => (
      <div className="note" key={note.title}>
        <h1>{note.title}</h1>
        <p>{note.description}</p>
      </div>
    ))}
  </div>

    </>
  )
}

export default App
