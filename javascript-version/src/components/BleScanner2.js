import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios'; // axios를 import

const BleScanner = () => {
  const [devices, setDevices] = useState([]);
  const [sensorValues, setSensorValues] = useState({});
  
  // 주석: 이 함수는 BLE 디바이스를 검색하고 페어링하는 함수입니다.
  const scanForDevices = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: 'TH' }],
        optionalServices: ['battery_service'],
      });

      if (device) {
        setDevices((prevDevices) => [...prevDevices, device]);
        console.log('Device found:', device);
        await connectToDeviceAndSetupNotifications(device); // 주석: 검색된 디바이스와 연결하고 알림을 설정합니다.
      }
    } catch (error) {
      console.error('Error scanning for Bluetooth devices:', error);
    }
  };

  // 주석: 이 함수는 디바이스와 연결하고, 알림을 설정하는 함수입니다.
  const connectToDeviceAndSetupNotifications = async (device) => {
    try {
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('battery_service');
      const characteristic = await service.getCharacteristic('battery_level');

      characteristic.addEventListener('characteristicvaluechanged', (event) => {
        const value = event.target.value.getUint8(0);
        setSensorValues((prevValues) => {
          const newValueArray = (prevValues[device.id] || []).slice(-29);
          newValueArray.push(value);
          return {
            ...prevValues,
            [device.id]: newValueArray,
          };
        });
      });

      await characteristic.startNotifications();
    } catch (error) {
      console.error('Error connecting to device and setting up notifications:', error);
    }
  };

  // 주석: 평균 값을 계산하는 함수입니다.
  const calculateAverage = (values) => {
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return values.length > 0 ? sum / values.length : 0;
  };

  // 주석: 평균 값을 백엔드로 전송하는 함수입니다.
  const sendAverageToBackend = async (deviceId, averageValue) => {
    try {
      await axios.post('https://local:8089/api/sensor-data', {
        deviceId,
        averageValue,
      });
      console.log(`Sent average value ${averageValue} for device ${deviceId} to backend`);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  // 주석: 페어링된 디바이스의 센서 값을 주기적으로 업데이트합니다.
  useEffect(() => {
    const updateSensorValues = async () => {
      for (const device of devices) {
        try {
          const server = await device.gatt.connect();
          const service = await server.getPrimaryService('battery_service');
          const characteristic = await service.getCharacteristic('battery_level');
          const value = await characteristic.readValue();
          setSensorValues((prevValues) => {
            const newValueArray = (prevValues[device.id] || []).slice(-29);
            newValueArray.push(value.getUint8(0));
            const updatedValues = {
              ...prevValues,
              [device.id]: newValueArray,
            };
            const averageValue = calculateAverage(newValueArray); // 주석: 평균 값 계산
            sendAverageToBackend(device.id, averageValue); // 주석: 백엔드로 평균 값 전송
            return updatedValues;
          });
        } catch (error) {
          console.error('Error reading sensor values:', error);
        }
      }
    };

    const interval = setInterval(updateSensorValues, 1000); // 주석: 1초마다 업데이트

    return () => clearInterval(interval); // 주석: 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
  }, [devices]);

  return (
    <div>
      <Button 
        fullWidth 
        variant='contained'
        onClick={scanForDevices}
      >
        주변 센서 찾기
      </Button>
      {devices.length > 0 && (
        <ul>
          {devices.map((device, index) => (
            <li key={index}>
              {device.name || 'Unnamed Device'} ({device.id})
              <ul>
                {sensorValues[device.id] && sensorValues[device.id].map((value, idx) => (
                  <li key={idx}>{value}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BleScanner;
