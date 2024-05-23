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

const CalendarCard = () => {
  const [schedule, setSchedule] = useState([]);

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
      <CardHeader />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
        <div style={{ height: '800px' }}>
          <Calendar 
            localizer={localizer} 
            events={schedule} 
            title="schedule_title"
            startAccessor="start_date" 
            endAccessor="end_date" 
            // eventPropGetter= "color"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default CalendarCard
