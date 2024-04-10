// src/pages/api/schedule_all.js
// 전체 일정 API 파일 입니다.
// 스케쥴 테이블에서 모든 정보를 받아옵니다.

import axios from 'axios';

export default async function handler(req, res) {
  try {
    
    if (req.method === 'GET') {

      // GET 요청: 일정 데이터를 조회하여 클라이언트에 응답
      const response = await axios.get('http://localhost:8089/api/schedule_all');
      const schedule = response.data;
      res.status(200).json({ schedule });

    } else if (req.method === 'POST') {

      // POST 요청: 클라이언트로부터 받은 일정 정보를 데이터베이스에 추가
      const { title, start_date, end_date, level, area, color, memo } = req.body;
      await axios.post('http://localhost:8089/api/schedule_all',
      {
        title: title,
        start_date: start_date,
        end_date: end_date,
        level: level,
        area: area,
        color: color,
        memo: memo,
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