// ** Icon imports
import { HomeOutline, AccessPoint, ClockOutline, Calendar, Monitor, Domain, AccountCogOutline, AlertCircleOutline, Logout } from 'mdi-material-ui'

const navigation = (userRole) => {
  const navItems = [
    {
      title: '대시보드',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: '건설 현장',
      icon: Domain,
      path: '/site-info'
    },
    {
      sectionTitle: '콘크리트 양생'
    },
    {
      title: '센서 관리',
      icon: AccessPoint,
      path: '/sensors',
      // adminOnly: true // 관리자 전용 항목 표시
    },
    {
      title: '센싱 & 모니터링',
      icon: Monitor,
      path: '/mornitoring'
    },
    {
      title: '콘크리트 분석',
      icon: ClockOutline,
      path: '/predict'
    },
    {
      title: '전체 일정표',
      icon: Calendar,
      path: '/calendar'
    },
    {
      sectionTitle: '관리자 전용',
      // adminOnly: true // 관리자 전용 섹션 표시
    },
    {
      title: '사용자 관리',
      icon: AccountCogOutline,
      path: '/users',
      // adminOnly: true // 관리자 전용 항목 표시
    },
    {
      sectionTitle: '계정',
    },
    {
      title: '로그아웃',
      icon: Logout,
      path: '/auth'
    },
  ];

  // 사용자 역할이 'manager'가 아닐 경우 관리자 전용 항목을 필터링
  return navItems.filter(item => !item.adminOnly || (item.adminOnly && userRole === 'manager'));
}

export default navigation;
