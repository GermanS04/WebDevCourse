const { Pool } = require("pg");
const { DB_ENV } = require("../constants/env.constants");

const pool = new Pool({
  user: DB_ENV.DB_USER,
  host: DB_ENV.DB_HOST,
  database: DB_ENV.DB_NAME,
  password: DB_ENV.DB_PASSWORD,
  port: DB_ENV.DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
