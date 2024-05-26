//src\views\account-settings\SiteAccount.js
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import SiteInfoList from 'src/components/SiteInfoList';

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

const SiteInfo = () => {
  const [imgSrc, setImgSrc] = useState('/images/misc/free-icon-building-6017722.png')
  const [site_img, setSiteImg] = useState('/images/misc/architecture-3050682_1920.jpg')
  
  const siteInfoList = SiteInfoList();

  return (

    <CardContent>
      <Grid container spacing={7}>
        <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ImgStyled src={imgSrc} alt='Profile Pic' />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            height={60}
            display="flex"
            alignItems="center"
            gap={4}
            p={3}
            sx={{ border: '0.5px solid grey', borderRadius: '6px' }}
          >
            <Typography variant='h6' sx={{ mr: 4 }}>
              현장코드
            </Typography>
          {siteInfoList[0]?.site_code}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            height={60}
            display="flex"
            alignItems="center"
            gap={4}
            p={3}
            sx={{ border: '0.5px solid grey', borderRadius: '6px' }}
          >
            <Typography variant='h6' sx={{ mr: 4 }}>
              현장이름
            </Typography>
            {siteInfoList[0]?.site_name}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            height={60}
            display="flex"
            alignItems="center"
            gap={4}
            p={3}
            sx={{ border: '0.5px solid grey', borderRadius: '6px' }}
          >
            <Typography variant='h6' sx={{ mr: 4 }}>
              건설사
            </Typography>
             {siteInfoList[0]?.site_company}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            height={60}
            display="flex"
            alignItems="center"
            gap={4}
            p={3}
            sx={{ border: '0.5px solid grey', borderRadius: '6px' }}
          >
            <Typography variant='h6' sx={{ mr: 4 }}>
              시작일
            </Typography>
            {siteInfoList[0]?.site_start}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            height={60}
            display="flex"
            alignItems="center"
            gap={4}
            p={3}
            sx={{ border: '0.5px solid grey', borderRadius: '6px' }}
          >
            <Typography variant='h6' sx={{ mr: 4 }}>
              종료일
            </Typography>
            {siteInfoList[0]?.site_end}
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

export default SiteInfo
