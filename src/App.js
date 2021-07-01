import { Button, FormControl, InputLabel, Input, TextField, Card } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import Todo from './Todo';
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);




  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");



  // when app loads we need to listen to the database and fetch new todos as they get added/removed

  useEffect(() => {
    // fires when app.js loads
    db.collection("todos").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo, description: doc.data().description, timestamp: doc.data().timestamp.toDate() })))
    })
  }
    , [input])

  const addTodo = (event) => {
    // after click this will fire off
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      description: description,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())

    })
    setInput("");
    setDescription("");
  }
  return (
    <div className="app">
      <h1>Your Todo is Finally Here</h1>
      <form className="form">
        <FormControl  >
          <TextField label="Title of Todo" variant="outlined"
            color="secondary" fullWidth={true} value={input} type="text" onChange={event => setInput(event.target.value)} />
          <br />
        </FormControl>
        <FormControl>
          <TextField
            label="Write Description of Todo"
            id="outlined-secondary"
            variant="outlined"
            color="secondary"
            multiline
            fullWidth={true}
            onChange={event => setDescription(event.target.value)}
            value={description}
            rows={5}
          />

        </FormControl>
        <Button disabled={!(input && description)} variant="contained" color="primary" onClick={addTodo} type="submit">
          Add Todo
        </Button>

      </form>

      <ul className="list">
        {todos.map(todo => (
          // <li>{todo}</li>
          <Todo todo={todo} />
        ))}
      </ul>
    </div >
  );
}

export default App;
