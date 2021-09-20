import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { useQuery } from 'u2hooks'
import { isFn } from '@/utils'
import './style.scss'

const LayoutBreadcrumb = ({ breadcrumb = [] }) => {
  const query = useQuery()
  return breadcrumb.length ? (
    <Breadcrumb className='layout-breadcrumb'>
      {breadcrumb.map((item, index) => {
        const { name, path } = item
        if (!name) {
          return null
        }
        if (index === breadcrumb.length - 1 && name) {
          return (
            <Breadcrumb.Item key={path}>
              {isFn(item.breadcrumb) ? item.breadcrumb(query) || name : name}
            </Breadcrumb.Item>
          )
        }
        return (
          <Breadcrumb.Item key={path}>
            <Link to={path}>
              {isFn(item.breadcrumb) ? item.breadcrumb(query) || name : name}
            </Link>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  ) : null
}

export default LayoutBreadcrumb
