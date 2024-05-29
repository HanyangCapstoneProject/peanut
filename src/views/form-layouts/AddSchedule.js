import React, { forwardRef, useState } from 'react'
import axios from 'axios'; 

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Divider from '@mui/material/Divider'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

import FormControl from '@mui/material/FormControl'
import CardActions from '@mui/material/CardActions'

// ** Icons Imports
import Calendar from 'mdi-material-ui/Calendar'
import Tag from 'mdi-material-ui/Tag'
import MapMarker from 'mdi-material-ui/MapMarker'
import Palette from 'mdi-material-ui/Palette'
import MessageOutline from 'mdi-material-ui/MessageOutline'

const CustomInputStart = forwardRef((props, ref) => {
  return (
    <TextField 
      fullWidth {...props}
      label='시작일'
      placeholder='YYYY-MM-DD'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Calendar />
          </InputAdornment>
        )
      }}
      inputRef={ref} 
      autoComplete='off'
    />
  )
})

const CustomInputEnd = forwardRef((props, ref) => {
  return (
    <TextField 
      fullWidth {...props}
      label='종료일'
      placeholder='YYYY-MM-DD'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Calendar />
          </InputAdornment>
        )
      }}
      inputRef={ref} 
      autoComplete='off'
    />
  )
})

const FormLayoutsIcons = () => {

  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('');
  const [area, setArea] = useState('');
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [color, setColor] = useState('');
  const [memo, setMemo] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStart_date(date);
  };

  const handleEndDateChange = (date) => {
    setEnd_date(date);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleMemoChange = (event) => {
    setMemo(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        await axios.post('/api/schedule_all', {
          title: title,
          // location: location,
          start_date: start_date,
          end_date: end_date,
          color: color,
          memo: memo,
        });
        console.log("성공");
        // 성공적으로 데이터가 추가되었음을 알리는 알림 등을 표시할 수 있습니다.
      } catch (error) {
        console.log("문제발생!");
        console.error(error);
        // 오류가 발생했을 때 사용자에게 알리는 메시지를 표시할 수 있습니다.
      }
    };
    fetchData();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Card>
      <CardHeader title='일정 추가/수정하기' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />

      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='일정명'
                placeholder='ex) 2차 양생일'
                value={title}
                onChange={handleTitleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Tag />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={start_date}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInputStart />}
                id='start-date'
                onChange={handleStartDateChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={end_date}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInputEnd />}
                id='end-date'
                onChange={handleEndDateChange}
              />
            </Grid>
            

            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel id='level-label'>층수</InputLabel>
                <Select
                  label='Status'
                  value={level}
                  onChange={handleLevelChange}
                  labelId='level-label'
                >
                  <MenuItem value='1'>1층</MenuItem>
                  <MenuItem value='2'>2층</MenuItem>
                  <MenuItem value='3'>3층</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel 
                id='area-label'>구역</InputLabel>
                <Select
                  label='Status'
                  value={area}
                  onChange={handleAreaChange}
                  labelId='area-label'
                >
                  <MenuItem value='1'>구역A</MenuItem>
                  <MenuItem value='2'>구역B</MenuItem>
                  <MenuItem value='3'>구역C</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel 
                id='color-label'>색깔</InputLabel>
                <Select
                  label='Status'
                  value={color}
                  onChange={handleColorChange}
                  labelId='color-label'
                >
                <MenuItem value='1'>파란색</MenuItem>
                <MenuItem value='2'>보라색</MenuItem>
                <MenuItem value='3'>빨간색</MenuItem>
              </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label='메모'
                placeholder='입력...'
                value={memo}
                onChange={handleMemoChange}
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
              />
            </Grid> 
           </Grid>
          </CardContent>
          
          <CardActions>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              추가/수정하기
            </Button>
            <Button size='large' color='secondary' variant='outlined'>
              취소
            </Button>
          </CardActions>
        </form>  
    </Card>
  );
};

export default FormLayoutsIcons
