// ** Icon imports
import { HomeOutline, AccessPoint, Calendar, ChartBar, Domain, AccountCogOutline, AlertCircleOutline } from 'mdi-material-ui'

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
      title: '목표 온도 분석',
      icon: ChartBar,
      path: '/analysis'
    },
    {
      title: '양생 완료일 예측',
      icon: Calendar,
      path: '/predict'
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
      title: '알림',
      icon: AlertCircleOutline,
      path: '/notifications'
    },
  ]
}

export default navigation
