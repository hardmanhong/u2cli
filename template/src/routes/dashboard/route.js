import { HomeOutlined } from '@ant-design/icons'

const route = {
  name: '首页概览',
  path: '/dashboard',
  // component: 'pages/dashboard',
  hideInBreadcrumb: true,
  icon: <HomeOutlined />,
  routes: [
    {
      name: 'dashboard/test1',
      hideInBreadcrumb: true,
      path: '/dashboard/test1',
      component: 'pages/test1'
    },
    {
      name: 'dashboard/test2',
      hideInBreadcrumb: true,
      path: '/dashboard/test2',
      component: 'pages/test2'
    }
  ]
}

export default route
export const sort = 1
