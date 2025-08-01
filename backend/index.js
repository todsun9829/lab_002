const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'mydb'
};

app.get('/gettime', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute('SELECT NOW() AS now');
    await conn.end();
    res.json({ status: 'ok', now: rows[0].now , db: 'mysql'});
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute('SELECT name,country from users');
    await conn.end();
    res.json({ status: 'success', data: rows });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
