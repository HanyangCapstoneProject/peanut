// 대시보드 페이지
// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import State from 'src/views/dashboard/State'
import Weather from 'src/views/dashboard/Weather'
import Analysis from 'src/views/dashboard/Analysis'
import Predict from 'src/views/dashboard/Predict'

import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'

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
          <DepositWithdraw />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
