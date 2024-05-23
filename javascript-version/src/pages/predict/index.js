// ** MUI Imports
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link'

// ** Demo Components Imports
import PredictCard from 'src/views/cards/PredictCard';
import AnalysisCard from 'src/views/cards/AnalysisCard';

const TypographyPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            콘크리트 정보
          </Link>
        </Typography>
        <Typography variant='body2'>콘크리트 정보 페이지입니다</Typography>
      </Grid>
      <Grid item xs={12}>
        <PredictCard />
      </Grid>
      <Grid item xs={12}>
        <AnalysisCard />
      </Grid>
    </Grid>
  )
}

export default TypographyPage
