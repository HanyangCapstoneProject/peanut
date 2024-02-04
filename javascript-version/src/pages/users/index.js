// 사용자 관리 페이지
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import UsersTable from 'src/views/tables/UsersTable'
import AddUser from 'src/views/form-layouts/AddUser'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            사용자 관리
          </Link>
        </Typography>
        <Typography variant='body2'>Tables display sets of data. They can be fully customized</Typography>
      </Grid>
      <Grid item xs={12}>
          <UsersTable />
        </Grid>
        <Grid item xs={12}>
          <TableStickyHeader />
        </Grid>
      <Grid item xs={12}>
          <AddUser />
        </Grid>
    </Grid>
  )
}

export default MUITable
