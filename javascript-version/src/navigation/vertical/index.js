// ** Icon imports
import { HomeOutline, AccessPoint, ClockOutline, Calendar, Monitor, Domain, AccountCogOutline, AlertCircleOutline } from 'mdi-material-ui'

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
      title: '센서 모니터링',
      icon: Monitor,
      path: '/mornitoring'
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
      sectionTitle: '기타 페이지 테스트'
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
    {
      title: '센싱2',
      icon: AlertCircleOutline,
      path: '/sensing2'
    },
  ]
}

export default navigation
