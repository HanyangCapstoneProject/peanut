// SensorMonitor Page
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

import FindSensor from 'src/views/form-layouts/FindSensor'

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
            title='1단계 - BLE 센서 연결하기'
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


      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='2단계 - 실시간 모니터링'
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
            >
              평균 값 전송하기
            </Button>
          </CardContent>
        </Paper>
      </Grid>

    </Grid>
  );
};

export default SensorMonitor;