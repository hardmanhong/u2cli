import React from 'react'
import { Layout } from 'antd'
import { CopyrightOutlined } from '@ant-design/icons'
import './style.scss'

const { Footer } = Layout
const LayoutFooter = () => {
  const now = new Date().getFullYear()
  return (
    <Footer className='page-footer' style={{ textAlign: 'center' }}>
      <CopyrightOutlined />
      <span> {now} Created by goandup@qq.com</span>
    </Footer>
  )
}

export default LayoutFooter
