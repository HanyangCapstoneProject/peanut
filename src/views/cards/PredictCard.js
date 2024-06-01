// * src/views/cards/PredictCard.js
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

import MenuUp from 'mdi-material-ui/MenuUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'

import ResultList from 'src/components/ResultList';
import Schedule from 'src/components/Schedule';

const data = [
  {
    progress: 0,
    imgHeight: 20,
    title: '다음 타설 예정일',
    color: 'primary',
    amount: '2024.01.25',
    subtitle: '2024.01.25',
    imgSrc: '/images/logos/check.png'
  },
  {
    progress: 25,
    color: 'info',
    imgHeight: 20,
    title: '중간 점검 작업',
    amount: '2024.01.24',
    subtitle: '2024.01.04',
    imgSrc: '/images/logos/check.png'
  },
  {
    progress: 90,
    imgHeight: 20,
    title: '양생 작업',
    color: 'secondary',
    amount: '2023.12.28',
    subtitle: '2024.01.02',
    imgSrc: '/images/logos/check.png'
  },
  {
    progress: 90,
    imgHeight: 20,
    title: '양생 작업',
    color: 'secondary',
    amount: '2023.12.28',
    subtitle: '2024.01.02',
    imgSrc: '/images/logos/check.png'
  }
]

const PredictCard = () => {

  const resultList = ResultList();
  const schedule = Schedule();

  const imgSrc = '/images/logos/check.png';
  const imgHeight = 20;

  // 현재 날짜 출력
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0]; // 날짜만 가져오기
      setCurrentDate(formattedDate);
    };

    updateDate(); // 컴포넌트가 마운트될 때 한 번 설정

    const interval = setInterval(updateDate, 1000 * 60 * 60 * 24); // 하루에 한 번 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);


  // resultList에서 goal_date 및 temp_goal 값 추출
  const goalDateValues = resultList.map(item => item.goal_date);
  const tempGoalValues = resultList.map(item => item.temp_goal);

  const calculateDaysDifference = (date1, date2) => {
    const diffTime = Math.abs(new Date(date2) - new Date(date1));
    
return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  return (
    <Card>
      <CardHeader
        title='양생 완료까지 남은 날'
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
        <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
          {calculateDaysDifference(currentDate, goalDateValues[0])}일
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
            <MenuUp sx={{ fontSize: '1.875rem', verticalAlign: 'middle' }} />
            <Typography variant='body2' sx={{ fontWeight: 600, color: 'success.main' }}>
              예측일 변동: {calculateDaysDifference(goalDateValues[1], goalDateValues[0])}일
            </Typography>
          </Box>
        </Box>

        <Typography component='p' variant='caption' sx={{ mb: 10 }}>
          
        </Typography>

        {schedule.map((item, index) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== schedule.length - 1 ? { mb: 8.5 } : {})
              }}
            >

              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 40,
                  height: 40,
                  backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.04)`
                }}
              >
                <img src={imgSrc} alt={item.title} height={imgHeight} />
              </Avatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant='caption'>{item.end_date}</Typography>
                </Box>

                <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                    {item.start_date}
                  </Typography>
                  <LinearProgress color={item.color} value={20} variant='determinate' />
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default PredictCard
