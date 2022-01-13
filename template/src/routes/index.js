import renderRoutes from './renderRoutes'

const importRoute = (r) =>
  r
    .keys()
    .map((key) => r(key))
    .sort((a, b) => (a.sort || 999) - (b.sort || 999))
    .map((m) => m.default)
const modules = importRoute(require.context('../', true, /route\.js$/))
/**
 * exact: Boolean 严格匹配，当有嵌套路由时需要，否则子路由也会匹配到
 * redirect: String 重定向路径
 * component: 渲染组件的文件路径
 * hideInMenu: Boolean 是否隐藏菜单栏
 * hideChildrenInMenu: Boolean 是否隐藏子路由菜单
 * hideInBreadcrumb: 隐藏当前面包屑名称
 * auth: Boolean 是否鉴权，默认是
 */
const routes = [
  {
    name: '登录',
    path: '/login',
    component: 'pages/login',
    auth: false
  },
  {
    component: 'layout',
    routes: [
      {
        path: '/',
        redirect: '/dashboard'
      },
      ...modules,
      {
        component: 'pages/404',
        auth: false
      }
    ]
  },
  {
    component: 'pages/404',
    auth: false
  }
]
export default renderRoutes(routes)
