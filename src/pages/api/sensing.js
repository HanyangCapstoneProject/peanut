// src/pages/api/sensing.js
//목표온도 계산하려고

import axios from 'axios';

export default async function handler(req, res) {
  try {
    
    if (req.method === 'POST') {
      // POST 요청: 클라이언트로부터 받은 센서 정보를 데이터베이스에 추가
      const { sensing_mac, sensing_temp, sensing_humi, sensing_time } = req.body;
      await axios.post('http://localhost:8089/api/sensing',
      {
        sensing_mac: sensing_mac,
        sensing_temp: sensing_temp,
        sensing_humi: sensing_humi,
        sensing_time: sensing_time,
      });
      console.log('데이터가 성공적으로 전송되었습니다.');
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
