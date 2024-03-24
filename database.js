const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '134.209.229.54',
  database: 'todo',
  password: 'Password_123',
  port: 5432,
});

module.exports = pool;
