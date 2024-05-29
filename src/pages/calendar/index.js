// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link'

// ** Demo Components Imports
import CalendarCard from 'src/views/cards/CalendarCard'
import AddSchedule from 'src/views/form-layouts/AddSchedule'

const TypographyPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            전체 일정
          </Link>
        </Typography>
        <Typography variant='body2'>전체 일정 페이지입니다</Typography>
      </Grid>
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
