const express = require("express");
const { Pool } = require("pg");
const app = express();
const PORT = 4003;
const cors = require("cors");

app.use(cors());

// Middleware - logs
app.use(express.json());

app.use((req, res, next) => {
  res.on("finish", async () => {
    const { user_id, task_id } = req.body; // assuming these values are sent in the request body
    const action = `${req.method} ${req.path}`; // e.g. "GET /users"

    if (user_id && task_id && action) {
      try {
        // await pool.query(
        //   'INSERT INTO logs (user_id, task_id, action) VALUES ($1, $2, $3)',
        //   [user_id, task_id, action]
        // );
      } catch (err) {

      }
    }
  });

  next(); // proceed to the next middleware or route handler
});

// PostgreSQL connection
const pool = new Pool({
  user: "trevor",
  host: "172.22.0.2",
  database: "todo",
  password: "password",
  port: 5432,
});

const bcrypt = require("bcrypt");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.post("/users", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM tasks WHERE task_id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, user_id, completed } = req.body;

  try {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, due_date = $3, user_id = $4, completed = $5 WHERE task_id = $6 RETURNING *",
      [title, description, due_date, user_id, completed, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.post("/tasks", async (req, res) => {
  const { title, description, due_date, user_id, completed } = req.body;

  if (!title || !user_id) {
    return res.status(400).json({ error: "Title and user_id are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, due_date, user_id, completed) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, due_date, user_id, completed]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
