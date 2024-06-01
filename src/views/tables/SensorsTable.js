// * src/views/tables/SensorTable.js
import React, { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination'

import SensorList from 'src/components/SensorList';

function SensorsTable() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const sensorList = SensorList();

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const statusObj = {
    1: { color: 'success' },
    2: { color: 'error' },
    3: { color: 'warning' }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell align="center">번호</TableCell>
              <TableCell align="center">종류</TableCell>
              <TableCell align="center">맥주소</TableCell>
              <TableCell align="center">설치시간</TableCell>
              <TableCell align="center">사용여부</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sensorList.map((row) => (
              <TableRow key={row.sensor_key}>
                <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">{row.sensor_key}</TableCell>
                <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">{row.sensor_type}</TableCell>
                <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">{row.sensor_mac}</TableCell>
                <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">{row.sensor_install}</TableCell>
                <TableCell>
                  <Chip
                    label={row.sensor_use}
                    color={statusObj[row.sensor_use]?.color || 'default'}
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'

        // count={rows.length} 
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default SensorsTable;
