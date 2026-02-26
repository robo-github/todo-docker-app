const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory todos (no DB needed for learning Docker!)
let todos = [
  { id: 1, text: 'Learn Docker basics', done: false },
  { id: 2, text: 'Write a Dockerfile', done: false },
  { id: 3, text: 'Run docker-compose up', done: false },
];
let nextId = 4;

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST create todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });
  const todo = { id: nextId++, text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT toggle done
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Not found' });
  todo.done = !todo.done;
  res.json(todo);
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
