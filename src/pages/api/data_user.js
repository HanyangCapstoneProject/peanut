// * src/pages/api/data_user.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    // HTTP 요청 메서드에 따라 분기 처리
    if (req.method === 'GET') {
      // GET 요청 처리: 사용자 데이터를 조회하여 클라이언트에 응답
      const response = await axios.get('http://localhost:8089/api/data_user');
      // 응답 데이터를 userList 변수에 할당
      const userList = response.data;
      // 클라이언트에 userList를 포함한 JSON 응답 전송
      res.status(200).json({ userList });
    } else if (req.method === 'POST') {
      // POST 요청 처리: 클라이언트로부터 받은 사용자 정보를 데이터베이스에 추가
      const { users_id, users_pw, users_name, users_authority } = req.body;
      // axios를 사용하여 POST 요청 전송
      await axios.post('http://localhost:8089/api/data_user', {
        users_id: users_id,
        users_pw: users_pw.password,
        users_name: users_name,
        users_authority: users_authority,
      });
      // axios를 사용하여 POST 요청 전송
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
