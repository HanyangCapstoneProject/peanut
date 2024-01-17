// 알림 페이지
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import NotiTable from 'src/views/tables/NotiTable'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            전체 알림사항
          </Link>
        </Typography>
        <Typography variant='body2'>Tables display sets of data. They can be fully customized</Typography>
      </Grid>
      <Grid item xs={12}>
          <NotiTable />
        </Grid>
    </Grid>
  )
}

export default MUITable
