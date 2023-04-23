//server
const express = require('express');
const app = express()

app.use(express.json())

const todos = []
const PORT = process.env.PORT || 3001;



app.get('/todos', (req, res) => {
    res.send(todos);
})

app.post('/todos', (req, res) => {
    todos.push(req.body)
    res.send(todos)
})

app.get('/todos/:id', (req, res) => {
    res.json("Gsesdf")
})

app.put('/todos/:id', (req,res) => {
    let id = Number(req.params.id)
    const todo = todos.find(todo => todo.id == id)
    todo.completed = !todo.completed
    res.send(todo)
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});