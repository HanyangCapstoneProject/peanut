// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`산학 캡스톤 디자인 `}
        <Link target='_blank' href='https://github.com/HanyangCapstoneProject'>
          Team 하냥땅콩
        </Link>
      </Typography>
      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}> 
          <Link target='_blank' href='http://sw.hanyang.ac.kr/'>
            한양대학교 에리카캠퍼스
          </Link>
          <Link
            target='_blank'
            href='http://www.iabacus.co.kr/iabacus/'
          >
            (주)애버커스
          </Link>
          <Link
            target='_blank'
            href='https://github.com/themeselection/materio-mui-react-nextjs-admin-template-free/blob/main/LICENSE'
          >
            MIT 라이센스
          </Link>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
