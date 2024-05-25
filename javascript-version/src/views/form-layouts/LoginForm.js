// * src/views/form-layouts/LoginForm.js
import * as React from "react"

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'

import UserList from "src/components/UserList"

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

export default function LoginPage(props) {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [manager, setManager] = React.useState(""); 

  const userList = UserList();

  // 비밀번호 감추기/보이기 
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // userList에서 phone, password 정보 찾기
  // 유저 전화번호와 비밀번호를 검사하여 로그인 상태를 반환하는 함수
  const handleLogin = (phone, password) => {
    const user = userList.find(user => user.users_id === phone && user.users_pw === password);
    setIsLoggedIn(!!user); // 사용자가 존재하면 true, 아니면 false를 반환
  };
  // manager 여부 반환하기

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.0 }}>
              밥4조 아그리콜라에 온 걸
            </Typography>
            <Typography variant='h3' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              환영합니다! 👋🏻
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField 
              autoFocus 
              fullWidth id='room' 
              label='방 이름' 
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              sx={{ marginBottom: 4 }} 
            />
            <TextField 
              autoFocus 
              fullWidth id='name' 
              label='내 이름' 
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              sx={{ marginBottom: 4 }} 
            />
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 3 }}
              onClick={() => props.btnFunction(room, name2, "join")}
            >
              게임 시작
            </Button>
            <Button
              fullWidth
              size='large'
              variant='outlined'
              sx={{ marginBottom: 3 }}
              onClick={() => props.btnFunction(room, name2, "tutorial")}
            >
              연습 모드
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
