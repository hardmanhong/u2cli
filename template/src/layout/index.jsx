import React, { useState, useEffect, useRef } from 'react'
import { Layout ,Tabs} from 'antd'
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
  genMenuData,
  genBreadcrumbMap,
  getBreadcrumb,
  getOpenMenuKeys,
  getSelectedMenuKeys
} from './utils'
import { useSetBreadcrumb } from '@/provider'

const {Tab} = Tabs;
const PageLayout = (props) => {
  const { route, children, location } = props
  const [collapsed, setCollapsed] = useState(false)
  const [menuData, setMenuData] = useState([])
  const [openMenuKeys, setOpenMenuKeys] = useState([])
  const [selectedMenuKeys, setSelectedMenuKeys] = useState([])
  const setBreadcrumb = useSetBreadcrumb()
  const prevOpenKeys = useRef(openMenuKeys)
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
    setOpenMenuKeys(openMenuKeys)
    setSelectedMenuKeys(selectedMenuKeys)
  }, [route, location])
  useEffect(() => {
    if (!collapsed) {
      setOpenMenuKeys(prevOpenKeys.current)
    }
  }, [collapsed])
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

          {children}</LayoutContent>
        <LayoutFooter />
      </Layout>
    </Layout>
  )
}

export default PageLayout
