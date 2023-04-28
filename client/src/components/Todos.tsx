import React, { useEffect, useState } from 'react'
import Searchbar from './Searchbar'
import Todo from './Todo'
import Inputs from './Inputs'
import Footer from './Footer'
import { TODO } from '../models'

function useFetchGET(initial: TODO[], url: string): [TODO[], React.Dispatch<React.SetStateAction<TODO[]>>]{
  const [todos, setTodos] = useState(initial)
  useEffect(() => {
    fetch(url).then(res => res.json()).then(res => {
      console.log(res)
      setTodos(res)
    })
  },[])
  return [todos,setTodos]
}

function put(url: string){
  fetch(url, {
    method: 'PUT'
  })
}

export default function Todos() {
  const [todos, setTodos] = useFetchGET([],'/todos')
  const [searchValue, setSearchValue] = useState('')
  const [hidden,setHidden] = useState(false)



  function addTask(task: string, assignee: string){

    fetch('/todos',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Math.random(),
        task: task,
        assignee: assignee,
        completed: false
      })
    }).then(res => res.json()).then(res => {
      setTodos(res)
    })
  }
  function hideTodos(){
    setHidden(prev => !prev)
  }

  function completeTodo(id: number){
    const newTodos = todos.map(todo => {
      if(todo.id != id)return todo
      put(`/todos/${todo.id}`)
      return {
        ...todo,
        completed: !todo.completed
      }
    })
    setTodos(newTodos)
  }

  function deleteTodo(id: number){
    const newTodos = todos.filter(todo => todo.id != id)

    setTodos(newTodos)
  }

  const displayedToDos = todos.filter(todo => todo.task.toLowerCase().includes(searchValue.toLowerCase())).map(todo => {
    return <Todo key={todo.id} id={todo.id} task={todo.task} assignee={todo.assignee} completed={todo.completed} completeTodo={completeTodo} deleteTodo={deleteTodo} />
  })
  return (
    <>
      <Inputs addTask={addTask} />
      <main>
          <Searchbar setSearchValue={setSearchValue} hideTodos={hideTodos} hidden={hidden}/>
          <div className="tasks-container">
              {!hidden && displayedToDos}
          </div>
      </main>
      <Footer todos={todos} />
    </>
    
    
    
  )
}
