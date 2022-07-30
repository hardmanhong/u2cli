import React, { useMemo } from 'react'
import { Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import './style.scss'
const { Sider } = Layout

const width = 208
const collapsedWidth = 48

const generateStyle = (w) => ({
  width: w,
  overflow: 'hidden',
  flex: `0 0 ${w}px`,
  maxWidth: w,
  minWidth: w,
  transition:
    'backgroundColor 0.5s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s'
})

const LayoutSider = ({ collapsed = false, setCollapsed, children }) => {
  const style = useMemo(
    () => generateStyle(collapsed ? collapsedWidth : width),
    [collapsed]
  )
  return (
    <>
      <div style={style}></div>
      <Sider
        className='page-sider'
        theme='light'
        collapsible
        breakpoint='xl'
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={width}
        collapsedWidth={collapsedWidth}
        trigger={
          <div className='page-sider-trigger'>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        }
      >
        {children}
      </Sider>
    </>
  )
}

export default LayoutSider
