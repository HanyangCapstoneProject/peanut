// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import AnalysisCard from 'src/views/cards/AnalysisCard'

const TypographyPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AnalysisCard />
      </Grid>
    </Grid>
  )
}

export default TypographyPage
