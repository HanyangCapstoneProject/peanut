import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

function SensorsTable() {
  const [sensor_t, setSensorT] = useState([]);

  const statusObj = {
    1: { color: 'success' },
    2: { color: 'error' },
    3: { color: 'warning' }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data_sensor');
        if (response.status === 200) {
          const jsonData = response.data;
          setSensorT(Array.isArray(jsonData.sensor_t) ? jsonData.sensor_t : [jsonData.sensor_t]);
          console.log(jsonData.sensor_t);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
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
          {sensor_t.map((row) => (
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
  );
}

export default SensorsTable;
