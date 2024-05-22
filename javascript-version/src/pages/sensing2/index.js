// components/SensorMonitor.js
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const initialData = [
  { id: '1', name: 'Sensor 1', value: 20, timestamp: '2024-05-22 10:00:00' },
  { id: '2', name: 'Sensor 2', value: 30, timestamp: '2024-05-22 10:00:00' },
  // 초기 데이터 추가
];

const SensorMonitor = () => {
  const [sensorData, setSensorData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = sensorData.map(sensor => ({
        ...sensor,
        value: Math.floor(Math.random() * 100),
        timestamp: new Date().toLocaleString(),
      }));
      setSensorData(newData);
    }, 1000);

    return () => clearInterval(interval);
  }, [sensorData]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        센서 모니터링
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>센서 ID</TableCell>
              <TableCell>센서 이름</TableCell>
              <TableCell>값</TableCell>
              <TableCell>타임스탬프</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sensorData.map(sensor => (
              <TableRow key={sensor.id}>
                <TableCell>{sensor.id}</TableCell>
                <TableCell>{sensor.name}</TableCell>
                <TableCell>{sensor.value}</TableCell>
                <TableCell>{sensor.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          실시간 센서 데이터
        </Typography>
        <LineChart width={600} height={300} data={sensorData}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </Paper>
    </Container>
  );
};

export default SensorMonitor;
