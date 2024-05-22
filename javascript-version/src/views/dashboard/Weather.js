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
import WeatherRainy from 'mdi-material-ui/WeatherRainy'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = "3928ebf09d1e4495380386b521a3a0f1";

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [cityName, setCityName] = useState('');

  const weatherData = [
    {
      stats: weather.temp ? `${weather.temp}°C` : '0',
      title: '기온',
      color: 'primary',
      icon: <TemperatureCelsius sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: weather.humidity ? `${weather.humidity}%` : '0',
      title: '습도',
      color: 'success',
      icon: <WeatherRainy sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: weather.windSpeed ? `${weather.windSpeed}` : '0',
      color: 'warning',
      title: '바람',
      icon: <WeatherWindy sx={{ fontSize: '1.75rem' }} />,
    },
    {
      stats: weather.clouds ? `${weather.clouds}%` : '0',
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

      const weatherData = {
        temp: res.data.main.temp,
        humidity: res.data.main.humidity,
        windSpeed: res.data.wind.speed,
        clouds: res.data.clouds.all,
        weatherMain: res.data.weather[0].main,
        cityName: res.data.name
      };

      setWeather(weatherData);
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
    return weatherData.map((item, index) => (
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
