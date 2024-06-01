import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const BleScanner = () => {
  const [devices, setDevices] = useState([]); // 연결된 기기 목록
  const [batteryLevel, setBatteryLevel] = useState(null); // 현재 배터리 상태
  const [currentDateTime, setCurrentDateTime] = useState(''); // 현재 날짜와 시간
  const [batteryLevels, setBatteryLevels] = useState([]); // 배터리 상태 이력
  const [timeStamps, setTimeStamps] = useState([]); // 시간 이력
  const [page, setPage] = useState(1); // 현재 페이지
  const [rowsPerPage] = useState(30); // 페이지 당 행 수
  const [num, setNum] = useState(0); // 센싱한 개수

  const scanForDevices = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: 'S' }],
        optionalServices: ['battery_service'],
      });

      if (device) {
        setDevices((prevDevices) => [...prevDevices, device]);
        console.log('Device found:', device);
        await connectToDevice(device);
      }
    } catch (error) {
      console.error('Error scanning for Bluetooth devices:', error);
    }
  };

  const connectToDevice = async (device) => {
    try {
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('battery_service');
      const characteristic = await service.getCharacteristic('battery_level');
      readBatteryLevel(characteristic);

      const id = setInterval(() => readBatteryLevel(characteristic), 1000);
      setIntervalId(id);
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };

  const readBatteryLevel = async (characteristic) => {
    try {
      const value = await characteristic.readValue();
      const batteryLevel = value.getUint8(0);
      setBatteryLevel(batteryLevel);

      const today = new Date();
      const formattedDateTime = today.toLocaleString();
      setCurrentDateTime(formattedDateTime);

      // 이전 배터리 상태와 시간을 배열에 추가
      setBatteryLevels((prevLevels) => [...prevLevels, batteryLevel]);
      setTimeStamps((prevTimes) => [...prevTimes, formattedDateTime]);

      // 최근 30개 이력만 유지
      if (batteryLevels.length > 30) {
        setBatteryLevels((prevLevels) => prevLevels.slice(1));
        setTimeStamps((prevTimes) => prevTimes.slice(1));
      }

      // 센싱한 개수 업데이트
      setNum((prevNum) => prevNum + 1);
    } catch (error) {
      console.error('Error reading battery level:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date();
      const formattedDateTime = today.toLocaleString();
      setCurrentDateTime(formattedDateTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Button
        size="large"
        type="submit"
        sx={{ mr: 2 }}
        fullWidth
        variant="contained"
        onClick={scanForDevices}
      >
        주변 센서 찾기
      </Button>
      {devices.length > 0 && (
        <ul>
          {devices.map((device, index) => (
            <li key={index}>
              {device.name || 'Unnamed Device'} (식별자: {device.id})
            </li>
          ))}
        </ul>
      )}
      {batteryLevel !== null && (
        <div>
          <p>현재 배터리 수준: {batteryLevel}%</p>
          <p>현재 날짜와 시간: {currentDateTime}</p>
          <h2>배터리 이력</h2>
          <Divider sx={{ margin: 0 }} />
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell align="center">센서 ID</TableCell>
                  <TableCell align="center">온도 (TEMP)</TableCell>
                  <TableCell align="center">습도 (HMID)</TableCell>
                  <TableCell align="center">타임스탬프</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? batteryLevels.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                  : batteryLevels
                ).map((level, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">
                      3
                    </TableCell>
                    <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">
                      {level}%
                    </TableCell>
                    <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">
                      습도 
                    </TableCell>
                    <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">
                      {timeStamps[(page - 1) * rowsPerPage + index]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ margin: 0 }} />
        </div>
      )}

      {num < 30 ? (
        <Button
          size="large"
          type="submit"
          sx={{ mr: 2, my: 2 }}
          fullWidth
          variant="contained"
          color='secondary'
        >
          ({num}/30) 평균 값 계산 중
        </Button>
      ) : (
        <Button
          size="large"
          type="submit"
          sx={{ mr: 2, my: 2 }}
          fullWidth
          variant="contained"
        >
          (30/30) 평균 값 전송하기
        </Button>
      )}
    </div>
  );
};

export default BleScanner;

