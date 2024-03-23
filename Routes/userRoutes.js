const express = require("express");
const pool = require("../database");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: "User account not found" });
    }

    const passwordMatches = await bcrypt.compare(password, user?.password);

    if (!passwordMatches) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.post("/users", async (req, res) => {
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
    res.status(500).json({ error: err?.message });
  }
});

module.exports = router;
