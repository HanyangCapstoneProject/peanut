import { forwardRef, useState, useEffect } from 'react';
import axios from 'axios';

// 차트 
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer  } from 'recharts';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// 테이블 MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// 양식 MUI
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical';

// 다른 파일 불러오기
import SensorList from 'src/components/SensorList';

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='센서 설치 일시' autoComplete='off' />
});

const SensorMonitor = () => {

  // 1. 센서 찾기 (센서 리스트 정보)
  const sensorList = SensorList();

  const [sensor_mac, setSensor_mac] = useState('');
  const [sensor_use, setSensor_use] = useState('');
  const [sensor_install, setSensor_install] = useState(null);

  const handleSensorMacChange = (event) => {
    setSensor_mac(event.target.value);
  };

  const handleSensorUseChange = (event) => {
    setSensor_use(event.target.value);
  };

  const handleSensorInstallChange = (date) => {
    setSensor_install(date);
  };

  // 2. 센싱 값 받아오기
  const [devices, setDevices] = useState([]);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [batteryLevels, setBatteryLevels] = useState([]);
  const [temperature, setTemperature] = useState(null);
  const [temperatures, setTemperatures] = useState([]);
  const [humidity, setHumidity] = useState(null);
  const [humidities, setHumidities] = useState([]);

  const [currentDateTime, setCurrentDateTime] = useState('');
  const [num, setNum] = useState(0);
  const [intervalId, setIntervalId] = useState(null); // To store interval ID

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
      readBatteryLevel(characteristic, device);

      const id = setInterval(() => readBatteryLevel(characteristic, device), 1000);
      setIntervalId(id); // Store the interval ID
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };

  const readBatteryLevel = async (characteristic, device) => {
    try {
      const value = await characteristic.readValue();
      const batteryLevel = value.getUint8(0);
      setBatteryLevel(batteryLevel);
 
      const temperature = device.name;
      setTemperature(temperature);

      const humidity = device.name;
      setHumidity(humidity);

      const today = new Date();
      const formattedDateTime = today.toLocaleString();
      setCurrentDateTime(formattedDateTime);

      const newBatteryData = { temp: temperature, humi: humidity, level: batteryLevel, timestamp: formattedDateTime };
      setBatteryLevels((prevLevels) => {
        const updatedLevels = [...prevLevels, newBatteryData];
        if (updatedLevels.length > 30) {
          clearInterval(intervalId); // Stop reading further
          characteristic.service.device.gatt.disconnect(); // Disconnect the device
          
return updatedLevels.slice(-30);
        }
        
return updatedLevels;
      });

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

  // 3. 센싱 값 평균 계산 하기 (이상치 처리하기)
  const calculateAverage = () => {
    if (batteryLevels.length === 0) return 0;
    const total = batteryLevels.reduce((sum, level) => sum + level.level, 0);
    return total / batteryLevels.length;
  };

  // 4. 센싱 값 평균 전송 하기
  const handleSubmit = async (e) => {
    e.preventDefault();

    const averageLevel = calculateAverage();

    try {
      await axios.post('/api/sensing', {
        sensing_mac,
        sensing_temp: averageLevel,
        sensing_humi,
        sensing_time: currentDateTime,
      });
      console.log("성공");

      // 성공적으로 데이터가 추가되었음을 알리는 알림 등을 표시할 수 있습니다.
    } catch (error) {
      console.log("문제발생!");
      console.log(sensing_mac);
      console.error(error);

      // 오류가 발생했을 때 사용자에게 알리는 메시지를 표시할 수 있습니다.
    }
  };

  const [sensing_mac, setSensing_mac] = useState('');
  const [sensing_temp, setSensing_temp] = useState('');
  const [sensing_humi, setSensing_humi] = useState('');
  const [sensing_time, setSensing_time] = useState('');

  const handleSensingMacChange = (event) => {
    setSensing_mac(event.target.value);
  };

  const handleSensingTempChange = (date) => {
    setSensing_temp(date);
  };

  const handleSensingHumiChange = (event) => {
    setSensing_humi(event.target.value);
  };

  const handleSensingTimeChange = (date) => {
    setSensing_time(date);
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
              <ResponsiveContainer width="95%" height={300}>
                <LineChart data={batteryLevels}>
                  <Line type="monotone" dataKey="level" stroke="#8884d8" />
                  <CartesianGrid stroke="#fff" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                </LineChart>

              </ResponsiveContainer>
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
              <div>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <Typography variant='body2' sx={{ fontWeight: 600 }}>
                        센서 정보로 찾기
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='sensor-mac'>센서 장치 번호</InputLabel>
                        <Select
                          label='센서 장치 번호'
                          value={sensor_mac}
                          onChange={handleSensorMacChange}
                          labelId='sensor-mac'
                        >
                          {sensorList.map((row, index) => (
                            <MenuItem key={index} value={row.sensor_mac}>{row.sensor_mac}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='sensor-status-label'>센서 사용 여부</InputLabel>
                        <Select
                          label='Status'
                          value={sensor_use}
                          onChange={handleSensorUseChange}
                          labelId='sensor-status-label'
                        >
                          <MenuItem value='1'>사용</MenuItem>
                          <MenuItem value='2'>사용 안함</MenuItem>
                          <MenuItem value='3'>미설치</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        selected={sensor_install}
                        showYearDropdown
                        showMonthDropdown
                        placeholderText='MM-DD-YYYY'
                        customInput={<CustomInput />}
                        id='sensor-installation-date'
                        onChange={handleSensorInstallChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        size="large"
                        type="button"
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
                            <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
                              <TableHead>
                                <TableRow>
                                  <TableCell align="center">센서 ID</TableCell>
                                  <TableCell align="center">온도 (TEMP)</TableCell>
                                  <TableCell align="center">습도 (HUMI)</TableCell>
                                  <TableCell align="center">배터리 수준</TableCell>
                                  <TableCell align="center">타임스탬프</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {batteryLevels.map((level, index) => (
                                  <TableRow key={index}>
                                    <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">
                                      3
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">
                                      {level.temp}
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">
                                      {level.humi}%
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">
                                      {level.level}%
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">
                                      {level.timestamp}
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
                          type="button"
                          sx={{ mr: 2, my: 2 }}
                          fullWidth
                          variant="contained"
                          color="secondary"
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
                      {sensing_temp !== '' && (
                        <div>
                          <h2>전송 내용</h2> 
                          <p>센싱 장치 번호: {sensing_mac}</p>
                          <p>센싱 평균 온도: {sensing_temp}</p>
                          <p>센싱 평균 습도: {sensing_humi}</p>
                          <p>센싱 시간: {currentDateTime}</p>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </form>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default SensorMonitor;
