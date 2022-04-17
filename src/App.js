
// set up state as React manages state and rerenders componentry
// to use state in a function component we need a "useState hook" and create default state
import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
// import uuid 
// import v4 from 'uuid';
const { v4: uuidv4 } = require('uuid');
const uuid = { v4: uuidv4 } 

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  // useState creates and returns a default empty array ->   const [todos, setTodos] = useState([]);
  // 1st element is all of our todos
  // 2nd element is the function we call that allows us to update our todos
  // e.g. Todo 1 & Todo 2 become our default values -> const [todos, setTodos] = useState(['Todo 1', 'Todo 2'])


  // set up id, name and complete flag ->  const [todos, setTodos] = useState([{ id: 1, name: 'Todo 1', complete: false }])
 

  // will have empty array as will by default when app starts up, set up eventlistener
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  // to load todos and save todos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // every time change call this function first
  useEffect(() => {
  // array of dependencies
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))}, [todos])

  // pass function to reach individual todos
  function toggleTodo(id) {
  // never directly modify a state variable, create a copy before modify so create variable with a copy of existing todos. Then use copy to create new state
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    //need access import, using reference hook -> useRef
    const name = todoNameRef.current.value
    if (name === '') return
    // console.log(name)
    // to clear => setTodos([])
    setTodos(prevTodos => {
      // use UUID library to cretae new unique ids for each (npm i uuid) 
      return [... prevTodos, { id:  { v4: uuidv4 } , name: name, complete: false}]
    })
    // if we type something and hit todo, it will clear input after
    todoNameRef.current.value = null;

    // use hook useEffect in order to save 
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    //  wrap in an empty element <></>, "fragment" as a JS function can only return one thing
    <>
     {/* props defaults passed through props like attributes to an HTML component */}

    <TodoList todos={todos} toggleTodo={toggleTodo}/>

    {/* use ref on input to access using const variable name */}
    <input ref={todoNameRef} type="text"></input>
    <button onClick={handleAddTodo}> Add Todo</button>
    <button onClick={handleClearTodos}> Clear Complete</button>
    {/* have number of todos left update dynamically */}
    <div> {todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
