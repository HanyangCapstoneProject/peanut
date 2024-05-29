import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import SiteInfoList from 'src/components/SiteInfoList';

// 배경 삼각형 이미지
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// 빌딩 이미지
const BuildingImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const State = () => {
  // 페이지 라우팅
  const router = useRouter();

  const handlePage = () => {
    router.push(`/site-info`);
  };

  // 현재 날짜 출력
  const [currentDate, setCurrentDate] = useState('');

  const siteInfoList = SiteInfoList();

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString(); // 날짜만 가져오기
      setCurrentDate(formattedDate);
    };

    updateDate(); // 컴포넌트가 마운트될 때 한 번 설정

    const interval = setInterval(updateDate, 1000 * 60 * 60 * 24); // 하루에 한 번 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>{siteInfoList[0]?.site_name}</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          {siteInfoList[0]?.site_code}
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          {currentDate}
        </Typography>
        <Button 
          size='small' 
          variant='contained'
          onClick={() => handlePage()}
        >
          현장정보
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <BuildingImg alt='building' src='\images\misc\free-icon-building-6017722.png' />
      </CardContent>
    </Card>
  )
}

export default State
