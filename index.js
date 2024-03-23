const express = require("express");
const app = express();
const PORT = 4003;
const cors = require("cors");
const userRoutes = require('./Routes/userRoutes');
const tasksRoutes = require('./Routes/tasksRoutes');

app.use(cors());

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

app.use(userRoutes);
app.use(tasksRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
