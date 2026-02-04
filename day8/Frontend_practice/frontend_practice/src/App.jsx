import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'



function App() {
  const [Notes, setNotes] = useState([])




  function fetchNotes() {
    axios.get("https://backend-1-lern.onrender.com/api/notes")
      .then((res) => {
        console.log("res.data", res.data);
        setNotes(res.data.notes);
      })
  }


  useEffect(() => {

    fetchNotes();
  }, [])


  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements
    console.log("title", title.value);
    console.log("description", description.value);

    axios.post("https://backend-1-lern.onrender.com/api/notes", {
      title: title.value,
      description: description.value
    })
      .then(res => {
        fetchNotes();
      })
  }

  function handledelete(note_id) {
    axios.delete(`https://backend-1-lern.onrender.com/api/notes/${note_id}`)
      .then(res => {
        fetchNotes();
      })
  }


  function handleUpdate(note) {
    const newtitle = prompt("enter new title", note.title);
    const newdescription = prompt("enter new description", note.description);
    axios.patch(`https://backend-1-lern.onrender.com/api/notes/${note._id}`, {
      title: newtitle,
      description: newdescription
    })
      .then(res => {
        fetchNotes();
      })
  }
return (
  <>
    <form
      className="note_created_form"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
      />

      <button type="submit">
        Create Note
      </button>
    </form>

    <div className="notes">
      {Notes.map((note) => (
        <div className="note" key={note._id}>
          <h1>{note.title}</h1>
          <p>{note.description}</p>

          <div className="buttons">
            <button
              className="delete"
              onClick={() => handledelete(note._id)}
            >
              Delete
            </button>

            <button
              className="update"
              onClick={() => handleUpdate(note)}
            >
              Update
            </button>
          </div>
        </div>
      ))}
    </div>
  </>
);

}

export default App
