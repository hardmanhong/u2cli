import React from 'react'
import { Layout } from 'antd'
import './style.scss'
const { Content } = Layout

const LayoutContent = ({ children }) => {
  return <Content className='page-content'>{children}</Content>
}

export default React.memo(LayoutContent)
