import * as React from "react";
import { useRouter } from "next/router";

// MUI 불러오기
import Grid from '@mui/material/Grid'

import LoginForm from '../../views/form-layouts/LoginForm';

export default function Home(props) {
  const router = useRouter();

  const handleJoinRoom = (user_, manager_) => {
    if(manager_) {
      router.push(`/manager`);
    }
    else {
      router.push(`/user`);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      my={20}
    >
      <LoginForm type="home" btnFunction={handleJoinRoom} />
    </Grid>
  );
}
