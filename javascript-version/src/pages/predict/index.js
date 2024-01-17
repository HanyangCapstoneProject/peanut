// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import PredictCard from 'src/views/cards/PredictCard'

const TypographyPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PredictCard />
      </Grid>
    </Grid>
  )
}

export default TypographyPage
