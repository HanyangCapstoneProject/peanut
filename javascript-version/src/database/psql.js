const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: '34.42.99.34',
  database: 'postgres',
  password: '0000',
  port: 5432,
});

app.get('/sensors', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM sensor');
    const sensors = result.rows;
    client.release();
    res.json(sensors);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use(express.static('public')); // 정적 파일을 제공하는 미들웨어를 사용합니다.

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
