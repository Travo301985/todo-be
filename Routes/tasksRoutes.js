const express = require("express");
const pool = require("../database");

const router = express.Router();

router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM tasks WHERE task_id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, dueDate, description, complete } = req.body;

  const due_date = dueDate;
  const completed = complete;

  if (!title || !due_date || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, due_date = $3, completed = $4 WHERE id = $6",
      [title, description, due_date, completed, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get("/tasks/:email", async (req, res) => {
  const { email } = req.params;

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];

  if (!user) {
    return res.status(400).json({ error: "User account not found" });
  }

  try {
    const result = await pool.query(
      "SELECT * tasks WHERE user_id = $1",
      [user?.id]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.post("/tasks", async (req, res) => {
  const { title, email, dueDate, description } = req.body;

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];

  const due_date = dueDate;
  const user_id = user?.id;
  const completed = false;

  if (!user) {
    return res.status(400).json({ error: "User account not found" });
  }

  if (!title || !email || !dueDate || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, due_date, user_id, completed) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, due_date, user_id, completed]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

module.exports = router;
