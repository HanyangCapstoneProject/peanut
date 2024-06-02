// src/pages/api/data_result.js
// 목표온도 API 파일 입니다.
// 구역과 목표 퍼센트율을 백엔드에서 받아 옵니다. (7개만 보여줄 거임)

import axios from 'axios';

export default async function handler(req, res) {
  try {
    
    if (req.method === 'GET') {

      // GET 요청: 데이터를 조회하여 클라이언트에 응답
      const response = await axios.get('http://localhost:8089/api/data_result');
      const resultList = response.data;
      res.status(200).json({ resultList });

    } else if (req.method === 'POST') {

      // POST 요청: 클라이언트로부터 받은 목표온도 정보를 데이터베이스에 추가
      const { level, area, temp_goal, cur_date, goal_date } = req.body;
      await axios.post('http://localhost:8089/api/data_result',
      {
        level: level,
        area: area,
        temp_goal: temp_goal,
        cur_date: cur_date,
        goal_date: goal_date
      });
      console.log('데이터가 성공적으로 전송되었습니다.');

    } else {
      // 허용되지 않는 메서드에 대한 오류 응답
      res.status(405).json({ message: '허용되지 않는 메서드입니다.' });
    }
  } catch (error) {
    // 오류 발생 시 오류 메시지와 함께 내부 서버 오류 응답 전송
    console.error(error);
    res.status(500).json({ message: '내부 서버 오류입니다.' });
  }
}