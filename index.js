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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});