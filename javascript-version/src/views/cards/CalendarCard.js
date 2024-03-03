import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icons Imports
import MenuUp from 'mdi-material-ui/MenuUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Calendar Imports
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);

const data = [
  {
    'title': 'All Day Event very long title',
    'allDay': true,
    'start': new Date(2015, 3, 0),
    'end': new Date(2015, 3, 1)
  },
  {
    'title': 'Long Event',
    'start': new Date(2015, 3, 7),
    'end': new Date(2015, 3, 10)
  },

  {
    'title': 'DTS STARTS',
    'start': new Date(2024, 2, 13, 0, 0, 0),
    'end': new Date(2024, 2, 20, 0, 0, 0)
  }
]

const CalendarCard = () => {
  const [schedule, setSchedule] = useState([]);

  const scheduleStatusObj = {
    1: { color: 'success' },
    2: { color: 'error' },
    3: { color: 'warning' }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/schedule');
        if (response.status === 200) {
          const jsonData = response.data;
          setSchedule(Array.isArray(jsonData.schedule) ? jsonData.schedule : [jsonData.schedule]);
          console.log(jsonData.schedule);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader
        title='전체 일정'
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton 
            size='small' 
            aria-label='settings' 
            className='card-more-options' 
            sx={{ color: 'text.secondary' }}
          >
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
        <div style={{ height: '800px' }}>
          <Calendar 
            localizer={localizer} 
            events={schedule} 
            title="schedule_title"
            startAccessor="start_date" 
            endAccessor="end_date" 
            // eventPropGetter={(myEventsList) => {
            //   const backgroundColor = myEventsList.colorEvento ? myEventsList.colorEvento : 'primary';
            //   const color = myEventsList.color ? myEventsList.color : 'primary';
            //   return { style: { backgroundColor ,color} }
            // }}
          />
        </div>
        <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mr: 4 }}>
            45%
          </Typography>
          <Typography variant='body2'>Your sales performance is 45% 😎 better compared to last month</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CalendarCard
