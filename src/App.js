import React, { useState, useRef } from "react";
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAaa0H1-H7bl5MyQd4QG-jZU67yU_hulMY",
  authDomain: "todo-react-eb4de.firebaseapp.com",
  projectId: "todo-react-eb4de",
  storageBucket: "todo-react-eb4de.appspot.com",
  messagingSenderId: "959500363396",
  appId: "1:959500363396:web:a3cdcc65ac3ee9658404d1"
})

const firestore = firebase.firestore();

function App() {

  const todoRef = firestore.collection('todos');

  const [newTodo, setNewTodo] = useState('');

  const query = todoRef.limit(20);
  const [todos] = useCollectionData(query, { idField: 'id' });

  const sendTodo = async(event) => {
    event.preventDefault();
  
    await todoRef.add({
      todo: newTodo
    })
    setNewTodo('');
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>TO DO</h1>
      </header>
      <section>
        <form className='main' onSubmit={sendTodo}>
          <label htmlFor="newTodo">Enter your Todo:</label>
          <input value={newTodo} onChange={(event) => setNewTodo(event.target.value)} placeholder="type here" />
          <button className="add">Add Todo</button>
        </form>
      </section>
      <section className="todos">
        {todos && todos.map(td => <Todo key={td.id} onetodo={td} />)}
      </section>
    </div>
  );
}
function Todo(props) {
  const { todo } = props.onetodo;


  const removeTodo = () => {
    //firestore.collection("todos").doc(todos[id]).delete();
    //console.log("removed!");
  }

  return (<>
    <div className={`todo`}>
      <p>{todo}</p>
      <button className="delete" onClick={removeTodo}>Remove Todo</button>
    </div>
  </>)

}

export default App;
