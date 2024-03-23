const { Pool } = require('pg');

const pool = new Pool({
  user: 'trevor',
  host: '172.24.0.2',
  database: 'todo',
  password: 'password',
  port: 5432,
});

module.exports = pool;
