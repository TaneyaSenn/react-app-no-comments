import React, { Component } from 'react'
// import todo component to map over loop
import Todo from './Todo'

// render todos from App.js props matching <TodoList todos={todos}/> 
export default function TodoList({ todos, toggleTodo }) {
  return (

    // <div>
    //     {/* in curly brackets because using JS code */}
    //     {/* to print out todos, iterate over them using map over current array and return elements of actual todos, using todo component */}
    //     {todos.length}
    // </div>

    // for each todo Component, return todo. Requires a Key-Prop so that React will only update the todos in the array that change/are new rather than rerendering all elements. Also need an object to store if the todo is complete and so need an ID in App.js as well as a Name.
    // make key same as id to make unique
    todos.map(todo => {
        return <Todo key={todo.id} toggleTodo= {toggleTodo} todo={todo}  />
    })
  )

}
