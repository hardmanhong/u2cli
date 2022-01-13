import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { useGetBreadcrumb } from '@/provider'
import './style.scss'

const LayoutBreadcrumb = () => {
  const breadcrumb = useGetBreadcrumb()
  return breadcrumb.length ? (
    <Breadcrumb className='layout-breadcrumb'>
      {breadcrumb.map((item, index) => {
        const { name, path } = item
        if (!name) {
          return null
        }
        if (index === breadcrumb.length - 1 && name) {
          return <Breadcrumb.Item key={path}>{name}</Breadcrumb.Item>
        }
        return (
          <Breadcrumb.Item key={path}>
            <Link to={path}>{name}</Link>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  ) : null
}

export default LayoutBreadcrumb
