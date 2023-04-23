import React, { useState } from 'react'

export default function Inputs({addTask}) {

  const [task,setTask] = useState('')
  const [assignee,setAssignee] = useState('')

  return (
    <header>
      <form>
        <div>
          <label htmlFor="task">Task</label>
          <input type="text" id="task" name="task" value={task} onChange={e => {
            setTask(e.target.value)
          }} />
        </div>
        <div>
          <label htmlFor="assignee">Assignee</label>
          <input type="text" id="assignee" value={assignee} onChange={e => {
            setAssignee(e.target.value)
          }} />
        </div>
        <button onClick={(e) => {
          e.preventDefault()
          setTask('')
          setAssignee('')
          if(task != '' && assignee != ''){
            addTask(task, assignee)
          }
        }}>Add</button>
      </form>
      <br />
      <br />
    </header>
  )
}
