// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import CalendarCard from 'src/views/cards/CalendarCard'
import AddSchedule from 'src/views/form-layouts/AddSchedule'

const TypographyPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CalendarCard />
      </Grid>
      <Grid item xs={12}>
        <AddSchedule />
      </Grid>
    </Grid>
  )
}

export default TypographyPage
