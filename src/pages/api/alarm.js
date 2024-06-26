// src/pages/api/alarm.js

import axios from 'axios';

export default async function handler(req, res) {
  try {
    
    if (req.method === 'GET') {

      // GET 요청: 센서 데이터를 조회하여 클라이언트에 응답
      const response = await axios.get('http://localhost:8089/api/alarm');
      const alarm_t = response.data;
      res.status(200).json({ alarm_t });

    } else if (req.method === 'POST') {

      // POST 요청: 클라이언트로부터 받은 센서 정보를 데이터베이스에 추가
      const { alarm_type, alarm_time, alarm_read } = req.body;
      await axios.post('http://localhost:8089/api/alarm',
      {
        alarm_type: alarm_type,
        alarm_time: alarm_time,
        alarm_read: alarm_read,
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
