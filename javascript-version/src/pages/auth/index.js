import * as React from "react";
import { useRouter } from "next/router";

// MUI 불러오기
import Grid from '@mui/material/Grid'

import LoginPage from '../../views/auth/LoginPage';

export default function Home(props) {
  const router = useRouter();

  const handleJoinRoom = (user_, manager_) => {
    if(manager_) {
      router.push(`/manager?name=${user_}`);
    }
    else {
      router.push(`/user?name=${user_}`);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      my={20}
    >
      <LoginPage type="home" btnFunction={handleJoinRoom} />
    </Grid>
  );
}
