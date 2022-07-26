import React, { useState, useEffect, useRef } from 'react'
import { Layout } from 'antd'
import {
  LayoutSider,
  LayoutMenu,
  LayoutHeader,
  LayoutBreadcrumb,
  LayoutContent,
  LayoutFooter
} from './components'
import './index.scss'
import {
  breadcrumbMap,
  genMenuData,
  genBreadcrumbMap,
  getBreadcrumb,
  getOpenMenuKeys,
  getSelectedMenuKeys
} from './utils'
import { useSetBreadcrumb } from '@/provider'
import { Tabs } from 'antd'

const { TabPane } = Tabs

const PageLayout = (props) => {
  const { route, children, location, history } = props
  const [collapsed, setCollapsed] = useState(false)
  const [menuData, setMenuData] = useState([])
  const [openMenuKeys, setOpenMenuKeys] = useState([])
  const [selectedMenuKeys, setSelectedMenuKeys] = useState([])
  const setBreadcrumb = useSetBreadcrumb()
  const prevOpenKeys = useRef(openMenuKeys)
  const [historyPaths, setHistoryPaths] = useState([])
  const [activeKey, setActiveKey] = useState('')
  useEffect(() => {
    genBreadcrumbMap(route.routes)
    setMenuData(genMenuData(route.routes))
  }, [route.routes])

  useEffect(() => {
    const breadcrumb = getBreadcrumb(location.pathname)
    const selectedMenuKeys = getSelectedMenuKeys(location.pathname)
    const openMenuKeys = getOpenMenuKeys(selectedMenuKeys)
    prevOpenKeys.current = openMenuKeys
    setBreadcrumb(breadcrumb)
    if (!collapsed) {
      setOpenMenuKeys(openMenuKeys)
    }
    setSelectedMenuKeys(selectedMenuKeys)
  }, [route, location, collapsed])
  useEffect(() => {
    if (!collapsed) {
      setOpenMenuKeys(prevOpenKeys.current)
    }
  }, [collapsed])
  useEffect(() => {
    const name = breadcrumbMap[location.pathname].name
    const path = [location.pathname, location.search].join('')
    setActiveKey(path)
    setHistoryPaths((l) => {
      return l.find((i) => i.path === path)
        ? l
        : [
            ...l,
            {
              name,
              path,
              children
            }
          ]
    })
  }, [location, children])
  const onTabChange = (key) => {
    history.replace(key)
  }
  const LayoutMenuProps = {
    menuData,
    openMenuKeys,
    selectedMenuKeys,
    setOpenMenuKeys,
    setSelectedMenuKeys
  }
  return (
    <Layout className='page-layout'>
      <LayoutSider collapsed={collapsed} setCollapsed={setCollapsed}>
        <LayoutMenu {...LayoutMenuProps} />
      </LayoutSider>
      <Layout>
        <LayoutHeader />
        <LayoutBreadcrumb />
        <LayoutContent>
          <Tabs activeKey={activeKey} onChange={onTabChange}>
            {historyPaths.map((item) => (
              <TabPane tab={item.name} key={item.path}>
                {children}
              </TabPane>
            ))}
          </Tabs>
        </LayoutContent>
        <LayoutFooter />
      </Layout>
    </Layout>
  )
}

export default PageLayout
