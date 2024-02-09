// src/pages/api/data_user.js
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: '0000',
  host: '34.42.99.34',
  database: 'postgres',
  port: '5432',
});


export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // GET 요청인 경우, 유저 데이터를 조회하여 클라이언트에 응답
      const user_t = await pool.query('SELECT * FROM users');
      res.status(200).json({
        user_t: user_t.rows,
      });
    } else if (req.method === 'POST') {
      // POST 요청인 경우, 클라이언트로부터 받은 센서 정보를 데이터베이스에 추가
      const { userName, userPnum, userAuthority, userPw } = req.body;
      const query = {
        text: 'INSERT INTO users (user_name, phone_id, authority, passwd) VALUES ($1, $2, $3, $4)',
        values: [userName, userPnum, userAuthority, userPw.password],
      };
      await pool.query(query);
      res.status(200).json({ message: 'Users information has been successfully added.' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Users Error' });
  }
}



