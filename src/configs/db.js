const mysql = require('mysql2')
const { DB_HOST, DB_NAME, DB_PASS, DB_USER, DB_PORT } = require('../helpers/env')

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: DB_PORT
});

module.exports = connection