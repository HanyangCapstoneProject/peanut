// ** React Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'


const FormLayoutsSeparator = () => {
  // ** States
  const [users_id, setuserId] = useState('');
  const [users_name, setuserName] = useState('');
  const [users_authority, setuserAuthority] = useState('');

  const [users_pw, setuserPw] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  const handleUserIdChange = (event) => {
    setuserId(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setuserName(event.target.value);
  };

  const handleuserAuthorityChange = (event) => {
    setuserAuthority(event.target.value);
  };

  // Handle Password
  const handlePasswordChange = prop => event => {
    setuserPw({ ...users_pw, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setuserPw({ ...users_pw, showPassword: !users_pw.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setuserPw({ ...users_pw, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setuserPw({ ...users_pw, showPassword2: !users_pw.showPassword2 })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (users_pw.password !== users_pw.password2) {
      console.error('비밀번호가 일치하지 않습니다.');
      // 오류 처리 로직 추가
      return;
    }

    try {
      const response = await axios.post('/api/data_user', {
        users_id: users_id,
        users_pw: users_pw,
        users_name: users_name,
        users_authority: users_authority
      });
      console.log('데이터가 성공적으로 전송되었습니다.');
      // 성공적으로 데이터를 전송한 후에 수행할 로직 추가
    } catch (error) {
      console.error('데이터 전송 중 오류가 발생했습니다:', error);
      // 데이터 전송 중 오류가 발생했을 때의 처리 로직 추가
    }
  };

  return (
    <Card>
      <CardHeader title='사용자 등록하기' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                사용자 정보 입력
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth label='사용자 이름'
                placeholder='홍길동'
                value={users_name}
                onChange={handleUserNameChange}
                />
            </Grid>
             
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth label='전화번호(아이디)' 
                placeholder='010-1234-5678' 
                value={users_id}
                onChange={handleUserIdChange}
                />
            </Grid>
           
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-separator-password'>비밀번호</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={users_pw.password}
                  id='form-layouts-separator-password'
                  onChange={handlePasswordChange('password')}
                  type={users_pw.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {users_pw.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-separator-password-2'>비밀번호 확인</InputLabel>
                <OutlinedInput
                  value={users_pw.password2}
                  label='Confirm Password'
                  id='form-layouts-separator-password-2'
                  onChange={handleConfirmChange('password2')}
                  type={users_pw.showPassword2 ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        aria-label='toggle password visibility'
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                      >
                        {users_pw.showPassword2 ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
           
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>권한</InputLabel>
                <Select
                  label='권한'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  value={users_authority}
                  onChange={handleuserAuthorityChange}
                >
                  <MenuItem value='false'>일반 사용자</MenuItem>
                  <MenuItem value='true'>관리자</MenuItem>
                 
                </Select>
              </FormControl>
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
  )
}

export default FormLayoutsSeparator
