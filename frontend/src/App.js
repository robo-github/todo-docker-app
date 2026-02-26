import React, { useState, useEffect } from 'react';
import './App.css';

const API = 'https://todo-docker-backend-72ip.onrender.com/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => { setTodos(data); setLoading(false); })
      .catch(() => { setError('Cannot reach backend!'); setLoading(false); });
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    });
    const todo = await res.json();
    setTodos([...todos, todo]);
    setInput('');
  };

  const toggleTodo = async (id) => {
    const res = await fetch(`${API}/${id}`, { method: 'PUT' });
    const updated = await res.json();
    setTodos(todos.map(t => t.id === id ? updated : t));
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== id));
  };

  const done = todos.filter(t => t.done).length;

  return (
    <div className="app">
      <div className="card">
        <div className="header">
          <div className="badge">🐳 Docker App</div>
          <h1>Todo List</h1>
          <p className="subtitle">
            React <span className="sep">+</span> Node.js <span className="sep">+</span> Docker
          </p>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={addTodo} className="form">
          <input
            className="input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit" className="btn-add">Add</button>
        </form>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: todos.length ? `${(done / todos.length) * 100}%` : '0%' }}
          />
        </div>
        <p className="progress-text">{done} of {todos.length} completed</p>

        <div className="list">
          {loading && <p className="loading">Loading...</p>}
          {!loading && todos.length === 0 && (
            <p className="empty">No todos yet! Add one above.</p>
          )}
          {todos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
              <button className="check-btn" onClick={() => toggleTodo(todo.id)}>
                {todo.done ? '✓' : '○'}
              </button>
              <span className="todo-text">{todo.text}</span>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>✕</button>
            </div>
          ))}
        </div>
      </div>

      <div className="info-card">
        <h3>🐳 Docker Architecture</h3>
        <div className="arch">
          <div className="arch-box frontend">React Frontend<br/><small>Port 3000</small></div>
          <div className="arch-arrow">→</div>
          <div className="arch-box backend">Node.js Backend<br/><small>Port 5000</small></div>
        </div>
        <p className="arch-note">Both services run in separate Docker containers, connected via docker-compose network.</p>
      </div>
    </div>
  );
}

export default App;
