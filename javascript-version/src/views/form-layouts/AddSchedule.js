import React, { forwardRef, useState } from 'react'

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
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [color, setColor] = useState('');
  const [memo, setMemo] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
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
        await axios.post('/api/schedule', {
          title: title,
          location: location,
          startDate: startDate,
          endDate: endDate,
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

      <CardContent>
        <form onSubmit={handleSubmit}>
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
            <Grid item xs={12}>
              <Select
                fullWidth
                label='현장 위치'
                placeholder='선택하세요.'
                value={location}
                onChange={handleLocationChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MapMarker />
                    </InputAdornment>
                  )
                }}
              >
                <MenuItem value='1'>사용</MenuItem>
                <MenuItem value='2'>사용 안함</MenuItem>
                <MenuItem value='3'>미설치</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={startDate}
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
                selected={endDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInputEnd />}
                id='end-date'
                onChange={handleEndDateChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-controlled-open-select-label">일정 색깔</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={color}
                label="일정 색깔"
                onChange={handleColorChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Palette />
                    </InputAdornment>
                  )
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MessageOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large'>
                추가/수정하기
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsIcons
