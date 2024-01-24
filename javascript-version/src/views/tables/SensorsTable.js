import React, { useState, useEffect } from 'react';
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


const statusObj = {
  1: { color: 'success' },
  2: { color: 'error' },
  3: { color: 'warning' }
};

const SensorsTable = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/sensors');
        const sensors = await response.json();
        setSensorData(sensors);
      } catch (error) {
        console.error('Error data', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>Sensor_code</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Mac</TableCell>
              <TableCell>Datetime</TableCell>
              <TableCell>Use</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sensorData.map((row) => (
              <TableRow key={row.Sensor_code}>
                <TableCell>{row.Sensor_code}</TableCell>
                <TableCell>{row.Type}</TableCell>
                <TableCell>{row.Mac}</TableCell>
                <TableCell>{row.Datetime}</TableCell>
                <TableCell>
                  <Chip
                    label={row.is_used}
                    color={statusObj[row.is_used].color}
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
  );
};

export default SensorsTable;
