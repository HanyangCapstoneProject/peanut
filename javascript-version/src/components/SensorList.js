const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/sensors/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sensorNumber,
          sensorType,
          sensorStatus,
          sensorInstallationDate,
        }),
      });
  
      if (response.ok) {
        console.log('센서 등록 성공');
      } else {
        console.error('센서 등록 실패');
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생', error);
    }
  };
  