const express = require("express");
const pool = require("../database");

const router = express.Router();

router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM tasks WHERE task_id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.put("/tasks/:id", async (req, res) => {
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

router.post("/tasks", async (req, res) => {
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

module.exports = router;
