// src/pages/api/schedule_predictdate.js
// 양생 완료일 예측 API 파일 입니다.
// 스케쥴 테이블에서 양생관련된 정보를 받아옵니다.

import axios from 'axios';

export default async function handler(req, res) {
  try {
    
    if (req.method === 'GET') {

      // GET 요청: 센서 데이터를 조회하여 클라이언트에 응답
      const response = await axios.get('http://localhost:8089/api/schedule_predictdate');
      const predictdate = response.data;
      res.status(200).json({ predictdate });

    } else if (req.method === 'POST') {

      // POST 요청: 클라이언트로부터 받은 센서 정보를 데이터베이스에 추가
      const { title, start_date, end_date, level, area, color, memo } = req.body;
      await axios.post('http://localhost:8089/api/schedule_predictdate',
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