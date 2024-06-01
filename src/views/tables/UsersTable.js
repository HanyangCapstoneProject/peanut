// * src/views/tables/UserTable.js
import React, { useState } from 'react';

import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import UserList from 'src/components/UserList';

function UsersTable() {
  // 페이지 상태를 정의합니다.
  const [page, setPage] = useState(0);

  // 페이지 당 행 수 상태를 정의합니다.
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // userList를 가져옵니다.
  const userList = UserList();

  // 페이지 변경 핸들러
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // 페이지 당 행 수 변경 핸들러
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // 사용자 권한 상태 색상 설정
  const statusObj = {
    true: { color: 'success' },
    false: { color: 'error' },
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
            {/* userList가 존재하고 비어있지 않은 경우 */}
            {userList && userList.length > 0 ? userList.map(row => (
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
            )) : (

              // 데이터가 없는 경우를 처리합니다.
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={userList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default UsersTable;
