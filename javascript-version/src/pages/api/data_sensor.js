// src/pages/api/data_sensor.js

import axios from 'axios';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // GET 요청: 센서 데이터를 조회하여 클라이언트에 응답
      const response = await axios.get('http://localhost:8089/api/data_sensor');
      const sensor_t = response.data;
      res.status(200).json({ sensor_t });
    } else if (req.method === 'POST') {
      // POST 요청: 클라이언트로부터 받은 센서 정보를 데이터베이스에 추가
      const { sensorKey, sensorMac, sensorType, sensorStatus, sensorInstallationDate } = req.body;
      await axios.post('http://localhost:8089/api/data_sensor', {
        sensorKey,
        sensorMac,
        sensorType,
        sensorStatus,
        sensorInstallationDate,
      });
      res.status(200).json({ message: 'Sensor information has been successfully added.' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


// import { Pool } from 'pg';

// const pool = new Pool({
//   user: 'postgres',
//   password: '0000',
//   host: '34.42.99.34',
//   database: 'postgres',
//   port: '5432',
// });


// export default async function handler(req, res) {
//   try {
//     if (req.method === 'GET') {
//       // GET 요청인 경우, 센서 데이터를 조회하여 클라이언트에 응답
//       const sensor_t = await pool.query('SELECT * FROM sensor');
//       res.status(200).json({
//         sensor_t: sensor_t.rows,
//       });
//     } else if (req.method === 'POST') {
//       // POST 요청인 경우, 클라이언트로부터 받은 센서 정보를 데이터베이스에 추가
//       const { sensorMac, sensorType, sensorStatus, sensorInstallationDate } = req.body;
//       const query = {
//         text: 'INSERT INTO sensor (mac, type, use, datetime_install, location_key) VALUES ($1, $2, $3, $4, $5)',
//         values: [sensorMac, sensorType, sensorStatus, sensorInstallationDate, 1],
//       };
//       await pool.query(query);
//       res.status(200).json({ message: 'Sensor information has been successfully added.' });
//     } else {
//       res.status(405).json({ message: 'Method Not Allowed' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }
