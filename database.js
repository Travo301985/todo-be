const { Pool } = require('pg');

const pool = new Pool({
  user: 'trevor',
  host: '197.221.253.18',
  database: 'todo',
  password: 'password',
  port: 5432,
});

module.exports = pool;
