// ** React Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ImgStyledMap = styled('img')(({ theme }) => ({
  width: 1000,
  height: 600,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/misc/free-icon-building-6017722.png')
  const [site_img, setImgMap] = useState('/images/misc/ImgMap.jpg')
  const onChange = async (file) => {
    const reader = new FileReader();
    const { files } = file.target;
  
    if (files && files.length !== 0) {
      reader.onload = async () => {
        setImgMap(reader.result);
  
        const formData = new FormData();
        formData.append('file', files[0]);
  
        try {
          const response = await axios.post('/api/site', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
  
          if (response.status === 200) {
            console.log('Image uploaded successfully:', response.data);
            // Update the database with the image URL or any other necessary action
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };
  

  const [site_t, setSiteT] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/site');
        if (response.status === 200) {
          const jsonData = response.data;
          setSiteT(Array.isArray(jsonData.site_t) ? jsonData.site_t : [jsonData.site_t]);
          console.log(jsonData.site_t);
          console.log(site_t[0]?.site_code);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      // try {
      //   const response = await axios.post('/api/site', {
      //     site_img: site_img,
      //   });
      //   console.log('데이터가 성공적으로 전송되었습니다.');
      //   // 성공적으로 데이터를 전송한 후에 수행할 로직 추가
      // } catch (error) {
      //   console.error('데이터 전송 중 오류가 발생했습니다:', error);
      //   // 데이터 전송 중 오류가 발생했을 때의 처리 로직 추가
      // }
    };
    fetchData();
  }, []);

  return (
    <CardContent>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='현장코드' placeholder = {site_t[0]?.site_code} defaultValue={site_t[0]?.site_code} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='현장이름' placeholder={site_t[0]?.site_name} defaultValue={site_t[0]?.site_name} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='건설사' placeholder={site_t[0]?.site_company} defaultValue={site_t[0]?.site_company} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='시작일' placeholder={site_t[0]?.site_start} defaultValue={site_t[0]?.site_start} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='종료일' placeholder={site_t[0]?.site_end} defaultValue={site_t[0]?.site_end} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                설계도 등록
                <input
                  hidden
                  type='file'
                  onChange={onChange}
                  accept='image/png, image/jpeg'
                  id='account-settings-upload-image'
                />
              </ButtonStyled>
              <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgMap(reader.result)}>
                Reset
              </ResetButtonStyled>
              <Typography variant='body2' sx={{ marginTop: 3 }}>
                Allowed PNG or JPEG. Max size of 800K.
              </Typography>
            </Box> 
          </Grid>
          <Grid item xs={12}>
        {/* 이미지 출력 */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ImgStyledMap src={site_img} alt='Profile Pic' />
            </Box>
          </Grid>
        </Grid>
    </CardContent>
  )
}

export default TabAccount


{/* <Box>
<ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
  Upload New Photo
  <input
    hidden
    type='file'
    onChange={onChange}
    accept='image/png, image/jpeg'
    id='account-settings-upload-image'
  />
</ButtonStyled>
<ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/misc/free-icon-building-6017722.png')}>
  Reset
</ResetButtonStyled>
<Typography variant='body2' sx={{ marginTop: 5 }}>
  Allowed PNG or JPEG. Max size of 800K.
</Typography>
</Box> 
*/}