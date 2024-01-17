// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

const rows = [
  {
    Sensor_code: 1,
    System_code: 1,
    Building: 'A건물',
    Level: 1,
    Area: 'a1',
    Mac: '201807130C23',
    Type: '온도',
    Datetime: '2023-12-28 14:30:17',
    Use: '사용'
  },
  {
    Sensor_code: 2,
    System_code: 2,
    Building: 'A건물',
    Level: 1,
    Area: 'a3',
    Mac: '201809130C25',
    Type: '온도',
    Datetime: '2023-12-28 17:30:17',
    Use: '미설치'
  },
  {
    Sensor_code: 3,
    System_code: 3,
    Building: 'C건물',
    Level: 1,
    Area: 'a1',
    Mac: '200706130C13',
    Type: '온도',
    Datetime: '2023-12-28 14:30:17',
    Use: '사용'
  },
  {
    Sensor_code: 4,
    System_code: 4,
    Building: 'C건물',
    Level: 1,
    Area: 'a1',
    Mac: '201404110B23',
    Type: '온도',
    Datetime: '2023-12-28 14:30:17',
    Use: '사용'
  },
  {
    Sensor_code: 5,
    System_code: 5,
    Building: 'A건물',
    Level: 2,
    Area: 'd1',
    Mac: '201507130C21',
    Type: '습도',
    Datetime: '2023-12-28 14:30:17',
    Use: '사용안함'
  },
  {
    Sensor_code: 6,
    System_code: 6,
    Building: 'B건물',
    Level: 2,
    Area: 'a2',
    Mac: '201807130C23',
    Type: '온도',
    Datetime: '2023-12-28 14:30:17',
    Use: '미설치'
  },
  {
    Sensor_code: 7,
    System_code: 7,
    Building: 'A건물',
    Level: 2,
    Area: 'b1',
    Mac: '201211210C23',
    Type: '온도',
    Datetime: '2024-01-07 08:30:17',
    Use: '사용'
  },
  {
    Sensor_code: 8,
    System_code: 8,
    Building: 'B건물',
    Level: 3,
    Area: 'a3',
    Mac: '202107130B17',
    Type: '온도',
    Datetime: '2024-01-02 14:30:17',
    Use: '사용안함'
  }
]

const statusObj = {
  '사용': { color: 'success' },
  '사용안함': { color: 'error' },
  '미설치': { color: 'warning' }
}

const DashboardTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Sensor_code</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Building</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Mac</TableCell>
              <TableCell>Datetime</TableCell>
              <TableCell>Use</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow hover key={row.Sensor_code} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.Sensor_code}</Typography>
                    <Typography variant='caption'>{row.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.Type}</TableCell>
                <TableCell>{row.Building}</TableCell>
                <TableCell>{row.Level}</TableCell>
                <TableCell>{row.Area}</TableCell>
                <TableCell>{row.Mac}</TableCell>
                <TableCell>{row.Datetime}</TableCell>
                <TableCell>
                  <Chip
                    label={row.Use}
                    color={statusObj[row.Use].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
