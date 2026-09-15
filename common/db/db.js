const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { Pool } = require('pg');
console.log('DB_NAME is:', process.env.DB_NAME);
console.log('DB_PASSWORD is:', process.env.DB_PASSWORD, typeof process.env.DB_PASSWORD)

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;