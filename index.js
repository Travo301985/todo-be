const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = 4003;

// PostgreSQL connection
const pool = new Pool({
  user: 'trevor',
  host: '172.17.0.2',
  database: 'todo',
  password: 'password',
  port: 5432,
});

// Middleware - logs
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred, please try again' });
  }
});

app.post('/users', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred, please try again' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM tasks WHERE task_id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred, please try again' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, user_id, completed } = req.body;

  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, due_date = $3, user_id = $4, completed = $5 WHERE task_id = $6 RETURNING *',
      [title, description, due_date, user_id, completed, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred, please try again' });
  }
});

app.post('/tasks', async (req, res) => {
  const { title, description, due_date, user_id, completed } = req.body;

  if (!title || !user_id) {
    return res.status(400).json({ error: 'Title and user_id are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, due_date, user_id, completed) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, due_date, user_id, completed]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred, please try again' });
  }
});