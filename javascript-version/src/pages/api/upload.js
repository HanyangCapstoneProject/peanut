//src\pages\api\upload.js

import axios from 'axios';

export default async function handler(req, res) {
  try {
    
    if (req.method === 'POST') {
      // POST 요청: 클라이언트로부터 받은 센서 정보를 데이터베이스에 추가
      const { site_img } = req.body;
      await axios.post('http://localhost:8089/api/upload',
      {
        site_img: site_img,
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
