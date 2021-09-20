import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useBoolean } from 'u2hooks'
import { UForm } from 'u2antd'
import { Input, Button, Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { LayoutFooter } from '@/layout/components'
import './style.scss'
import { login } from './api'

const Login = () => {
  const [errMsg, setErrMsg] = useState()
  const [loading, toggleLoading] = useBoolean()
  const history = useHistory()
  const query = useQuery()
  const onLogin = (values) => {
    setErrMsg('')
    toggleLoading(true)
    login(values)
      .finally(() => {
        toggleLoading(false)
      })
      .then((res) => {
        if (res.code == 200) {
          setErrMsg('')
          const token = res?.data?.token
          window.sessionStorage.setItem('username', values.user_name)
          window.sessionStorage.setItem('token', token)
          const path = query.from || '/'
          history.push(path)
        } else {
          setErrMsg(res.msg)
        }
      })
      .catch((err) => {
        setErrMsg(err.msg)
      })
  }
  const list = [
    {
      props: {
        name: 'user_name',
        rules: [{ required: true, message: '请输入用户名' }]
      },
      component: (
        <Input
          size='large'
          placeholder='请输入用户名'
          prefix={<UserOutlined className='icon' />}
        />
      )
    },
    {
      props: {
        name: 'password',
        rules: [{ required: true, message: '请输入密码' }]
      },
      component: (
        <Input.Password
          size='large'
          placeholder='请输入密码'
          prefix={<LockOutlined className='icon' />}
        />
      )
    }
  ]
  return (
    <div className='page-login'>
      <div className='content'>
        <div className='header'>德越建筑申购</div>
        <div className='form'>
          {errMsg && (
            <Alert
              message={errMsg}
              type='error'
              showIcon
              style={{ marginBottom: '24px' }}
            />
          )}
          <UForm
            list={list}
            wrapperCol={{ span: 24 }}
            requiredMark={false}
            initialValues={{ user_name: 'admin', password: 'deyue123456' }}
            onFinish={onLogin}
            footer={
              <Button
                block
                type='primary'
                size='large'
                htmlType='submit'
                loading={loading}
                className='button-login'
              >
                登录
              </Button>
            }
          />
        </div>
      </div>
      <LayoutFooter />
    </div>
  )
}

export default Login
