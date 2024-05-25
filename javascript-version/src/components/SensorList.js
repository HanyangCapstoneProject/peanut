// * src/components/SensorList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SensorList = () => {
  // sensorList 상태를 정의합니다.
  const [sensorList, setSensorList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출을 통해 데이터를 가져옵니다.
        const response = await axios.get('/api/data_sensor');
        if (response.status === 200) {
          const jsonData = response.data;
          // 데이터를 배열로 설정합니다.
          setSensorList(Array.isArray(jsonData.sensorList) ? jsonData.sensorList : [jsonData.sensorList]);
        } else {
          console.error('데이터 가져오기 실패');
        }
      } catch (error) {
        console.error('데이터 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  return sensorList;
};

export default SensorList;
