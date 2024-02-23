import express from 'express';
import {
  getTodo,
  sharedTodo,
  deleteTodo,
  getTodosByID,
  createTodo,
  toggleCompleted,
  getUserByEmail,
  getUserByID,
  getSharedTodoByID
} from './database.js';

const app = express();
app.use(express.json()); 

app.get("/todos?:id", async (req, res) => {
  const todos = await getTodosByID(req.params.id);
  res.status(200).send(todos);
  console.log(todos)
})

app.listen(8080, () => {
  console.log("server running on port 8080")
})