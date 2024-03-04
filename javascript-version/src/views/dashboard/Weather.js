// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import WeatherCloudy from 'mdi-material-ui/WeatherCloudy'
import WeatherWindy from 'mdi-material-ui/WeatherWindy'
import TemperatureCelsius from 'mdi-material-ui/TemperatureCelsius'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CurrencyUsd from 'mdi-material-ui/WeatherHurricane'
import WeatherRainy from 'mdi-material-ui/WeatherRainy'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// env
//REACT_APP_API_KEY = "3928ebf09d1e4495380386b521a3a0f1"
// 불러오기
const API_KEY = process.env.REACT_APP_API_KEY;

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [cityName, setCityName] = useState('');

  const salesData = [
    {
      stats: `${weather.temp}°C`,
      title: '기온',
      color: 'primary',
      icon: <TemperatureCelsius sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: `${weather.humidity}%`,
      title: '습도',
      color: 'success',
      icon: <WeatherRainy sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: `${weather.windSpeed}`,
      color: 'warning',
      title: '바람',
      icon: <WeatherWindy sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: `${weather.clouds}%`,
      color: 'info',
      title: '구름',
      icon: <WeatherCloudy sx={{ fontSize: '1.75rem' }} />,
    },
  ];

  const getWeather = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const weatherId = res.data.weather[0].id;
      const weatherIcon = res.data.weather[0].icon;
      const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      const temp = Math.round(res.data.main.temp);

      const weatherKo = res.data.weather[0].main; // or whatever you want to assign to weatherKo
      const cityName = res.data.name;

      setWeather({
        description: weatherKo,
        name: cityName,
        temp: temp,
        icon: weatherIconAdrs,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  }, []);

  const renderStats = () => {
    return salesData.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `${item.color}.main`,
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{item.title}</Typography>
            <Typography variant='h6'>{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ));
  };

  return (
    <Card>
      <CardHeader
        title='오늘의 날씨'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              흐린 후 맑음🌤
            </Box>{' '}
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important',
          },
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Weather;


/*

const salesData = [
  {
    stats: '15°C',
    title: '기온',
    color: 'primary',
    icon: <TemperatureCelsius sx={{ fontSize: '1.75rem'}} />
  },
  {
    stats: '70%',
    title: '습도',
    color: 'success',
    icon: <WeatherRainy sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '6',
    color: 'warning',
    title: '바람',
    icon: <WeatherWindy sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '',
    color: 'info',
    title: '구름',
    icon: <WeatherCloudy sx={{ fontSize: '1.75rem' }} />
  }
]



const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = () => {
  return (
    <Card>
      <CardHeader
        title='오늘의 날씨'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              흐린 후 맑음🌤
            </Box>{' '}
          
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard

*/