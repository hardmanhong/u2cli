import { TeamOutlined } from '@ant-design/icons'

const route = {
  name: '员工管理',
  path: '/staff',
  icon: <TeamOutlined />,
  hideChildrenInMenu: true,
  routes: [
    {
      exact: true,
      hideInBreadcrumb: true,
      name: '员工管理',
      path: '/staff',
      component: 'pages/staff'
    }
  ]
}
export default route
export const sort = 3
