// src/pages/api/concrete_goal.js
// 목표온도 API 파일 입니다.
// 구역과 목표 퍼센트율을 백엔드에서 받아 옵니다. (7개만 보여줄 거임)

import axios from 'axios';

export default async function handler(req, res) {
  try {
    
    if (req.method === 'GET') {

      // GET 요청: 데이터를 조회하여 클라이언트에 응답
      const response = await axios.get('http://localhost:8089/api/concrete_goal');
      const goal = response.data;
      res.status(200).json({ goal });

    } else if (req.method === 'POST') {

      // POST 요청: 클라이언트로부터 받은 목표온도 정보를 데이터베이스에 추가
      const { level, area, goal } = req.body;
      await axios.post('http://localhost:8089/api/concrete_goal',
      {
        level: level,
        area: area,
        goal: goal,
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