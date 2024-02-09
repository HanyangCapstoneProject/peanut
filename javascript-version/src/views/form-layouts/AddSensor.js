import React, { forwardRef, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='센서 설치 일시' autoComplete='off' />
})

function FormLayoutsSeparator() {
  const [sensorMac, setsensorMac] = useState('');
  const [sensorType, setSensorType] = useState('');
  const [sensorStatus, setSensorStatus] = useState('');
  const [sensorInstallationDate, setSensorInstallationDate] = useState(null);

  const handleSensorNumberChange = (event) => {
    setsensorMac(event.target.value);
  };

  const handleSensorTypeChange = (event) => {
    setSensorType(event.target.value);
  };

  const handleSensorStatusChange = (event) => {
    setSensorStatus(event.target.value);
  };

  const handleSensorInstallationDateChange = (date) => {
    setSensorInstallationDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/data', {
        sensorMac,
        sensorType,
        sensorStatus,
        sensorInstallationDate,
      });
      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
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
                value={sensorMac}
                onChange={handleSensorNumberChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='sensor-type-label'>센서 종류</InputLabel>
                <Select
                  label='Type'
                  value={sensorType}
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
                  value={sensorStatus}
                  onChange={handleSensorStatusChange}
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
                selected={sensorInstallationDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                id='sensor-installation-date'
                onChange={handleSensorInstallationDateChange}
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
}

export default FormLayoutsSeparator;

// import React, { forwardRef, useState } from 'react'
// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'
// import Divider from '@mui/material/Divider'
// import MenuItem from '@mui/material/MenuItem'
// import TextField from '@mui/material/TextField'
// import CardHeader from '@mui/material/CardHeader'
// import InputLabel from '@mui/material/InputLabel'
// import Typography from '@mui/material/Typography'
// import CardContent from '@mui/material/CardContent'
// import CardActions from '@mui/material/CardActions'
// import FormControl from '@mui/material/FormControl'
// import Select from '@mui/material/Select'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'


// const CustomInput = forwardRef((props, ref) => {
//   return <TextField fullWidth {...props} inputRef={ref} label='센서 설치 일시' autoComplete='off' />
// })

// const FormLayoutsSeparator = () => {
//   // States
//   const [sensorNumber, setSensorNumber] = useState('')
//   const [sensorType, setSensorType] = useState('')
//   const [sensorStatus, setSensorStatus] = useState('')
//   const [sensorInstallationDate, setSensorInstallationDate] = useState(null)

//   const handleSensorNumberChange = (event) => {
//     setSensorNumber(event.target.value)
//   }

//   const handleSensorTypeChange = (event) => {
//     setSensorType(event.target.value)
//   }

//   const handleSensorStatusChange = (event) => {
//     setSensorStatus(event.target.value)
//   }

//   const handleSensorInstallationDateChange = (date) => {
//     setSensorInstallationDate(date)
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // 여기에서 폼을 제출하는 로직을 추가할 수 있습니다.
//     console.log('등록하기 버튼이 클릭되었습니다.')
//     console.log('센서 번호:', sensorNumber)
//     console.log('센서 종류:', sensorType)
//     console.log('센서 상태:', sensorStatus)
//     console.log('센서 설치 일시:', sensorInstallationDate)
//   }

//   return (
//     <Card>
//       <CardHeader title='센서 등록하기' titleTypographyProps={{ variant: 'h6' }} />
//       <Divider sx={{ margin: 0 }} />
//       <form onSubmit={handleSubmit}>
//         <CardContent>
//           <Grid container spacing={5}>
//             <Grid item xs={12}>
//               <Typography variant='body2' sx={{ fontWeight: 600 }}>
//                 센서 정보 입력
//               </Typography>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label='센서 장치 번호'
//                 placeholder='carterLeonard'
//                 value={sensorNumber}
//                 onChange={handleSensorNumberChange}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel id='sensor-type-label'>센서 종류</InputLabel>
//                 <Select
//                   label='Type'
//                   value={sensorType}
//                   onChange={handleSensorTypeChange}
//                   labelId='sensor-type-label'
//                 >
//                   <MenuItem value='온도'>온도</MenuItem>
//                   <MenuItem value='습도'>습도</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel id='sensor-status-label'>센서 사용 여부</InputLabel>
//                 <Select
//                   label='Status'
//                   value={sensorStatus}
//                   onChange={handleSensorStatusChange}
//                   labelId='sensor-status-label'
//                 >
//                   <MenuItem value='사용'>사용</MenuItem>
//                   <MenuItem value='사용 안함'>사용 안함</MenuItem>
//                   <MenuItem value='미설치'>미설치</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <DatePicker
//                 selected={sensorInstallationDate}
//                 showYearDropdown
//                 showMonthDropdown
//                 placeholderText='MM-DD-YYYY'
//                 customInput={<CustomInput />}
//                 id='sensor-installation-date'
//                 onChange={handleSensorInstallationDateChange}
//               />
//             </Grid>
//           </Grid>
//         </CardContent>
//         <Divider sx={{ margin: 0 }} />
//         <CardActions>
//           <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
//             등록하기
//           </Button>
//           <Button size='large' color='secondary' variant='outlined'>
//             취소
//           </Button>
//         </CardActions>
//       </form>
//     </Card>
//   )
// }

// export default FormLayoutsSeparator
