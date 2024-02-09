// ** MUI Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'


function UsersTable() {
  const [user_t, setuserT] = useState([]);

  const statusObj = {
    true: { color: 'success' },
    false: { color: 'error' },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data_user');
        if (response.status === 200) {
          const jsonData = response.data;
          setuserT(Array.isArray(jsonData.user_t) ? jsonData.user_t : [jsonData.user_t]);
          // console.log(jsonData);
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
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>이름</TableCell>
              <TableCell>전화번호</TableCell>
              <TableCell>비밀번호</TableCell>
              <TableCell>권한</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user_t.map(row => (
              <TableRow hover key={row.user_name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{row.user_name}</TableCell>
                <TableCell>{row.phone_id}</TableCell>
                <TableCell>{row.passwd}</TableCell>
                <TableCell>
                  <Chip
                    label={row.authority}
                    color={statusObj[row.authority].color}
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

export default UsersTable;
