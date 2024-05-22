import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'

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
  const router = useRouter();

  const handlePage = () => {
    router.push(`/site-info`);
  };

  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>강남구 힐스테이트</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          KDS 41 10 00:2014
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          2024.01.08
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
