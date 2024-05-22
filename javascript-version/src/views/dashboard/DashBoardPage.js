// 대시보드 페이지
// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import State from 'src/views/dashboard/State'
import Weather from 'src/views/dashboard/Weather'
import Notification from 'src/views/dashboard/Notification'

import Analysis from 'src/views/cards/AnalysisCard'
import Predict from 'src/views/cards/PredictCard'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <State />
        </Grid>
        <Grid item xs={12} md={8}>
          <Weather />
        </Grid>
        <Grid item xs={12} md={6}>
          <Analysis />
        </Grid>
        <Grid item xs={12} md={6}>
          <Predict />
        </Grid>
        <Grid item xs={12} md={12}>
          <Notification />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard