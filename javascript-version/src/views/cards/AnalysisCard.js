// * src/views/cards/AnalysisCard.js
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import DotsVertical from 'mdi-material-ui/DotsVertical';
import ReactApexcharts from 'src/@core/components/react-apexcharts';

import ResultList from 'src/components/ResultList';

const AnalysisCard = () => {
  const router = useRouter();

  const handlePage = () => {
    router.push(`/monitoring`);
  };

  const theme = useTheme()

  const resultList = ResultList();

  // resultList에서 Date 및 temp_goal 값 추출
  const dateValues = resultList.map(item => item.date);
  const tempGoalValues = resultList.map(item => item.temp_goal);

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '40%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5
      }
    },
    dataLabels: { enabled: false },
    colors: [
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.primary.main,
      theme.palette.background.default,
      theme.palette.background.default
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: dateValues,
      tickPlacement: 'on',
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetX: -17,
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}%`
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='콘크리트 목표 온도'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='bar' height={205} options={options} series={[{ data: tempGoalValues }]} />
        <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mr: 4 }}>
            현재 날짜와 같은 값의 목표 온도
          </Typography>
          <Typography variant='body2'>tkdxo</Typography>
        </Box>
        <Button 
          fullWidth 
          variant='contained'
          onClick={() => handlePage()}
        >
          센서 모니터링 하기
        </Button>
      </CardContent>
    </Card>
  )
}

export default AnalysisCard
