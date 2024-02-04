// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import CalendarCard from 'src/views/cards/CalendarCard'

const TypographyPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CalendarCard />
      </Grid>
    </Grid>
  )
}

export default TypographyPage
