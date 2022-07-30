import { HomeOutlined } from '@ant-design/icons'

const route = {
  name: '首页概览',
  path: '/dashboard',
  hideInBreadcrumb: true,
  icon: <HomeOutlined />,
  routes: [
    {
      name: 'dashboard1',
      path: '/dashboard/dashboard1',
      component: 'pages/dashboard1',
      icon: <HomeOutlined />
    },
    {
      name: 'dashboard2',
      path: '/dashboard/dashboard2',
      component: 'pages/dashboard2',
      icon: <HomeOutlined />
    },
    {
      name: 'dashboard3',
      path: '/dashboard/dashboard3',
      component: 'pages/dashboard3',
      icon: <HomeOutlined />
    }
  ]
}

export default route
export const sort = 1
