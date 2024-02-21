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
              <TableCell align="center">번호</TableCell> 
              <TableCell align="center">이름</TableCell>
              <TableCell align="center">전화번호</TableCell>
              <TableCell align="center">비밀번호</TableCell>
              <TableCell align="center">권한</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user_t.map(row => (
              <TableRow key={row.users_key}>
                <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">{row.users_key}</TableCell>
                <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">{row.users_name}</TableCell>
                <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">{row.users_id}</TableCell>
                <TableCell sx={{ fontSize: '1rem', color: 'black' }} align="center">{row.users_pw}</TableCell>
                <TableCell>
                  <Chip
                    label={row.users_authority}
                    color={statusObj[row.users_authority].color}
                    sx={{
                      height: 24,
                      '& .MuiChip-label': { fontWeight: 500 },
                      justifyContent: 'center', alignItems: 'center'
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
