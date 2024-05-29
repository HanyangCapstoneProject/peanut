// src/pages/api/site.js

import axios from 'axios';

export default async function handler(req, res) {
  try {
    
    if (req.method === 'GET') {
      // GET 요청: 센서 데이터를 조회하여 클라이언트에 응답
      const response = await axios.get('http://localhost:8089/api/site');
      const siteInfoList = response.data;
      res.status(200).json({ siteInfoList });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
