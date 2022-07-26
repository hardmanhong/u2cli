import React, { useEffect } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import loadable from '@loadable/component'
import { Spin } from 'antd'
import NProgress from 'nprogress'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

const Loading = () => {
  useEffect(() => {
    NProgress.start()
    return () => {
      NProgress.done()
    }
  })

  return ''
}

const dynamicImport = (path) => {
  return loadable(() => import(`@/${path}`), {
    fallback: <Loading />
  })
}

/**
 * 预加载component，修复页面首次加载时闪烁
 */
const preloadComponent = (routes) =>
  routes.map((item) => {
    if (typeof item.component === 'string') {
      item.component = dynamicImport(item.component)
    }
    if (item.routes) preloadComponent(item.routes)
    return item
  })
const RouterGuard = ({ route, children }) => {
  const location = useLocation()
  const token = window.sessionStorage.getItem('token')
  if (token) {
    if (route.path === '/login') return <Redirect to='/' />
    return children
  }
  if (route.auth === false) {
    return children
  }
  const path = `/login?from=${location.pathname}`
  return <Redirect to={path} />
}
const renderRoutes = (routes) => {
  if (!routes || !Array.isArray(routes)) return null
  routes = preloadComponent(routes)
  return (
    <CacheSwitch>
      {routes.map((route, i) => {
        if (route.redirect) {
          return (
            <Redirect
              exact
              key={route.key || i}
              from={route.path}
              to={route.redirect}
              strict={route.strict}
            />
          )
        }
        return (
          <CacheRoute
            className='cache-route'
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props) => {
              const childRoutes = renderRoutes(route.routes)
              if (route.component) {
                return (
                  <RouterGuard route={route}>
                    <route.component {...props} route={route}>
                      {childRoutes}
                    </route.component>
                  </RouterGuard>
                )
              } else {
                return childRoutes
              }
            }}
          />
        )
      })}
    </CacheSwitch>
  )
}

export default renderRoutes
