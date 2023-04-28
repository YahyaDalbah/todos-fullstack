import React from 'react'
import { TODO } from '../models';

export default function Footer({todos}: {todos: TODO[]}) {

  let completedTodos = 0

  todos.forEach(todo => {
    if(todo.completed)completedTodos++
  })

  return (
    <footer>
        <p>tasks: {todos.length}</p>
        <p className="completedTasks">completed tasks: {completedTodos}</p>
        <p>remaining tasks: {todos.length - completedTodos}</p>
    </footer>

  )
}
