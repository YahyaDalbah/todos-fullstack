import React, { useEffect, useState } from 'react'
import Searchbar from './Searchbar'
import Todo from './Todo'
import Inputs from './Inputs'
import Footer from './Footer'

function useFetchGET(initial, url){
  const [todos, setTodos] = useState(initial)
  useEffect(() => {
    fetch(url).then(res => res.json()).then(res => {
      console.log(res)
      setTodos(res)
    })
  },[])
  return [todos,setTodos]
}

function post(todo){
  fetch('/todos',{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo)
  }).then(res => {
    console.log(res)
    console.log(todo)
  })
}

function put(url){
  fetch(url, {
    method: 'PUT'
  })
}

export default function Todos() {
  const [todos, setTodos] = useFetchGET([],'/todos')
  const [searchValue, setSearchValue] = useState('')
  const [hidden,setHidden] = useState(false)



  function addTask(task, assignee){
    setTodos([...todos, {
      id: Math.random(),
      task: task,
      assignee: assignee,
      completed: false
    }])
    post({
      id: Math.random(),
      task: task,
      assignee: assignee,
      completed: false
    })
  }
  function hideTodos(){
    setHidden(prev => !prev)
  }

  function completeTodo(id){
    const newTodos = todos.map(todo => {
      if(todo.id != id)return todo
      return fetch(`/todos/${id}`, { method: 'PUT' })
      .then(res => res.json())
      .then(updatedTodo => ({
        ...updatedTodo,
        completed: !updatedTodo.completed
      }))
    })
    Promise.all(newTodos).then(setTodos);
  }

  function deleteTodo(id){
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
