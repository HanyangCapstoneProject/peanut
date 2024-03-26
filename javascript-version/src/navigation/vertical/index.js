// ** Icon imports
import { HomeOutline, AccessPoint, ClockOutline, Calendar, ChartBar, Domain, AccountCogOutline, AlertCircleOutline } from 'mdi-material-ui'

const navigation = () => {
  return [
    {
      title: '대시보드',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: '건설현장',
      icon: Domain,
      path: '/site-info'
    },
    {
      sectionTitle: '콘크리트 양생'
    },
    {
      title: '콘크리트 정보',
      icon: ClockOutline,
      path: '/predict'
    },
    {
      title: '전체 일정표',
      icon: Calendar,
      path: '/calendar'
    },
    {
      sectionTitle: '관리자 페이지'
    },
    {
      title: '센서 관리',
      icon: AccessPoint,
      path: '/sensors'
    },
    {
      title: '사용자 관리',
      icon: AccountCogOutline,
      path: '/users'
    },
    {
      sectionTitle: '앱에서만 구동될 서비스'
    },
    {
      title: '로그인',
      icon: AlertCircleOutline,
      path: '/auth'
    },
    {
      title: '센싱',
      icon: AlertCircleOutline,
      path: '/sensing'
    },
  ]
}

export default navigation
