import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Calendar Imports
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Schedule from 'src/components/Schedule';

const localizer = momentLocalizer(moment);

const CalendarCard = () => {
  const schedule = Schedule();

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
