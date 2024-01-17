// 센서 관리 페이지
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import SensorsTable from 'src/views/tables/SensorsTable'
import AddSensor from 'src/views/form-layouts/AddSensor'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            센서 관리
          </Link>
        </Typography>
        <Typography variant='body2'>Tables display sets of data. They can be fully customized</Typography>
      </Grid>
      <Grid item xs={12}>
          <SensorsTable />
        </Grid>
      <Grid item xs={12}>
          <AddSensor />
        </Grid>
    </Grid>
  )
}

export default MUITable