import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [status, setStatus] = useState("loading");
  const [notes, setNotes] = useState(null);
  const [text, setText] = useState("");
  const reloadNotes = () => setStatus("loading");

  useEffect(() => {
    let canceled = false;
    if (status !== "loading") return;
    axios("/api/get-all-notes").then((result) => {
      if (canceled === true) return;
      if (result.status !== 200) {
        console.error("Error loading notes");
        console.error(result);
        return;
      }
      setNotes(result.data.notes);
      setStatus("loaded");
    });
    return () => {
      canceled = true;
    };
  }, [status]);
  function textInput(e) {
    setText(e.target.value);
  }
  async function submit(e) {
    e.preventDefault();
    if (text === "") return;

    const resp = await axios.post("/api/create-note", { text });
    console.log(resp);
    setText("");
    reloadNotes();
  }
  async function deleteNote(id) {
    const resp = await axios.post("/api/delete-note", { id });
    reloadNotes();
  }
  return (
    <div className="App">
      <ul>
        {notes ? (
          <ul>
            {notes.map((note) => (
              <li key={note._id}>
                {" "}
                {note.text}{" "}
                <button onClick={() => deleteNote(note._id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading notes...</p>
        )}

        <li>
          <form onSubmit={submit}>
            <input type="text" name="text" value={text} onChange={textInput} />
            <input type="submit" />
          </form>
        </li>
      </ul>
    </div>
  );
}

export default App;
