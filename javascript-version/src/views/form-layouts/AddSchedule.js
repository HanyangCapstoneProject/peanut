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

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
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
            <AccountOutline />
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
            <AccountOutline />
          </InputAdornment>
        )
      }}
      inputRef={ref} 
      autoComplete='off'
    />
  )
})

const FormLayoutsIcons = () => {

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleStartDateChange = (date) => {
    setStartDate(date)
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
  }

  return (
    <Card>
      <CardHeader title='일정 추가/수정하기' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='일정명'
                placeholder='2차 양생일'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='현장 위치'
                placeholder='선택하세요.'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
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
              <TextField
                fullWidth
                label='일정 색깔'
                placeholder='선택하세요.'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label='메모'
                placeholder='Bio...'
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
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsIcons
