import React, { forwardRef, useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='센서 설치 일시' autoComplete='off' />
})

const FormLayoutsSeparator = () => {
  // States
  const [sensor_mac, setSensor_mac] = useState('');
  const [sensor_type, setSensor_type] = useState('');
  const [sensor_use, setSensor_use] = useState('');
  const [sensor_install, setSensor_install] = useState(null);

  const handleSensorMacChange = (event) => {
    setSensor_mac(event.target.value);
  };

  const handleSensorTypeChange = (event) => {
    setSensor_type(event.target.value);
  };

  const handleSensorUseChange = (event) => {
    setSensor_use(event.target.value);
  };

  const handleSensorInstallChange = (date) => {
    setSensor_install(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        await axios.post('/api/data_sensor', {
          sensor_mac: sensor_mac,
          sensor_type: sensor_type,
          sensor_install: sensor_install,
          sensor_use: sensor_use,
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
    <Card>
      <CardHeader title='센서 등록하기' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                센서 정보 입력
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='센서 장치 번호'
                placeholder='carterLeonard'
                value={sensor_mac}
                onChange={handleSensorMacChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='sensor-type-label'>센서 종류</InputLabel>
                <Select
                  label='Type'
                  value={sensor_type}
                  onChange={handleSensorTypeChange}
                  labelId='sensor-type-label'
                >
                  <MenuItem value='온도'>온도</MenuItem>
                  <MenuItem value='습도'>습도</MenuItem>
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
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            등록하기
          </Button>
          <Button size='large' color='secondary' variant='outlined'>
            취소
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default FormLayoutsSeparator;
