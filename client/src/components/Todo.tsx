import React, { useState } from 'react'

type Props = {
  id: number,
  task: string,
  assignee: string,
  completed: boolean,
  completeTodo:(id: number) => void, 
  deleteTodo: (id: number) => void
}

export default function Todo({id, task, assignee, completed, completeTodo, deleteTodo}: Props) {

  let className = completed ? 'task done' : 'task'

  return (
    <div className={className}>
      <div>
        <input type="checkbox" onChange={() => {
          completeTodo(id)
        }} />
        <label htmlFor="">complete</label>
        <p>task: <span>{task}</span></p>
        <p>assignee: <span>{assignee}</span></p>
      </div>
      <div>
        <button onClick={() => deleteTodo(id)} className='delete'>delete</button>
      </div>
    </div>
  )
}
