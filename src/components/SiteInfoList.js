// * src/components/SiteInfoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SiteInfoList = () => {
  // siteInfoList 상태를 정의합니다.
  const [siteInfoList, setSiteInfoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출을 통해 데이터를 가져옵니다.
        const response = await axios.get('/api/site');
        if (response.status === 200) {
          const jsonData = response.data;
          // 데이터를 배열로 설정합니다.
          setSiteInfoList(Array.isArray(jsonData.siteInfoList) ? jsonData.siteInfoList : [jsonData.siteInfoList]);
        } else {
          console.error('데이터 가져오기 실패');
        }
      } catch (error) {
        console.error('데이터 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  return siteInfoList;
};

export default SiteInfoList;
