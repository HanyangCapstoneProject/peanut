import { useState, useEffect } from 'react';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical';

import FindSensor from 'src/views/form-layouts/FindSensor';

const initialData = [
  { id: '1', name: 'Sensor 1', value: 20, timestamp: '2024-05-22 10:00:00' },
  { id: '2', name: 'Sensor 2', value: 30, timestamp: '2024-05-22 10:00:00' },

  // 초기 데이터 추가
];

const initialMeanData = [
  { number: '1', id: '1', temp: '25.3', humi: '100', timestamp: '2024-05-22 10:00:00' },
  { number: '2', id: '1', temp: '25.2', humi: '99', timestamp: '2024-05-22 10:00:00' },
];

const SensorMonitor = () => {
  const [sensorData, setSensorData] = useState(initialData);
  const [meanData, setMeanData] = useState(initialMeanData);

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

  // 현재 날짜 출력
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString(); // 날짜만 가져오기
      setCurrentDate(formattedDate);
    };

    updateDate(); // 컴포넌트가 마운트될 때 한 번 설정

    const interval = setInterval(updateDate, 1000 * 60 * 60 * 24); // 하루에 한 번 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  // States
  const [sensor_mac, setSensor_mac] = useState(initialMeanData[0].id);
  const [sensor_temp, setSensor_temp] = useState(initialMeanData[0].temp);
  const [sensor_humi, setSensor_humi] = useState(initialMeanData[0].humi);
  const [sensor_time, setSensor_time] = useState(currentDate);

  const handleSensorMacChange = (event) => {
    setSensor_mac(event.target.value);
  };

  const handleSensorTempChange = (event) => {
    setSensor_temp(event.target.value);
  };

  const handleSensorHumiChange = (event) => {
    setSensor_humi(event.target.value);
  };

  const handleSensorTimeChange = (date) => {
    setSensor_time(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        await axios.post('/api/sensing', {
          sensor_mac: sensor_mac,
          sensor_temp: sensor_temp,
          sensor_humi: sensor_humi,
          sensor_time: sensor_time,
        });
        console.log("성공");

        // 성공적으로 데이터가 추가되었음을 알리는 알림 등을 표시할 수 있습니다.
      } catch (error) {
        console.log("문제발생!");
        console.log(sensor_mac);
        console.error(error);

        // 오류가 발생했을 때 사용자에게 알리는 메시지를 표시할 수 있습니다.
      }
    };
    fetchData();
  };

  return (
    <div>
      <Grid container spacing={6}>

        <Grid item xs={12}>
          <Typography variant='h5'>
            <Link href='https://mui.com/components/tables/' target='_blank'>
              센싱 값 받기
            </Link>
          </Typography>
          <Typography variant='body2'>센서 모니터링 페이지입니다</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title='실시간 모니터링'
              titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
              action={
                <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
                  <DotsVertical />
                </IconButton>
              }
            />
            <Divider sx={{ margin: 0 }} />
            <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
              <LineChart width={1200} height={300} data={sensorData}>
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader
              title='센싱 하기'
              titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
              action={
                <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
                  <DotsVertical />
                </IconButton>
              }
            />
            <Divider sx={{ margin: 0 }} />
            <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
              <FindSensor />
            </CardContent>
          </Card>
        </Grid>

        {/* 

      <Grid item xs={12}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <CardHeader
            title='3단계 - 센서 값 모으기'
            titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
            action={
              <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
                <DotsVertical />
              </IconButton>
            }
          />
          <Divider sx={{ margin: 0 }} />
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell align="center">센서 ID</TableCell>
                  <TableCell align="center">센서 이름</TableCell>
                  <TableCell align="center">값</TableCell>
                  <TableCell align="center">타임스탬프</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sensorData.map(sensor => (
                  <TableRow key={sensor.id}>
                    <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">{sensor.id}</TableCell>
                    <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">{sensor.name}</TableCell>
                    <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">{sensor.value}</TableCell>
                    <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">{sensor.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <CardContent>
            <Button
              fullWidth
              variant='contained'
              onClick={handleSubmit}
            >
              평균 값 전송하기
            </Button>
          </CardContent>
        </Paper>
      </Grid> */}
      </Grid>
    </div>
  );
};

export default SensorMonitor;
