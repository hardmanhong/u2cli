import React from 'react'
import { Layout, Avatar, Dropdown, Menu, Form, Input } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './style.scss'
import { UModal } from 'u2antd'
import { useHistory } from 'react-router'

const { Header } = Layout
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
}
const ModalPassword = () => {
  const plyload = UModal.usePayload(ModalPassword, {})
  const [form] = Form.useForm()
  const onSubmit = () => {
    form.validateFields().then((values) => {})
  }

  return (
    <UModal title='修改密码' onOk={onSubmit}>
      <Form form={form} {...formLayout} initialValues={plyload}>
        <Form.Item
          label='账号'
          name='username'
          rules={[{ required: true, message: '请输入账号' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='原密码'
          name='password'
          rules={[{ required: true, message: '请输入原密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label='新密码'
          name='password1'
          rules={[{ required: true, message: '请输入新密码' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </UModal>
  )
}

const LayoutHeader = () => {
  const history = useHistory()
  const username = window.sessionStorage.getItem('username')
  const onLogout = () => {
    sessionStorage.clear()
    history.replace('/login')
  }
  const onChangePsw = () => {
    ModalPassword.show({})
  }
  return (
    <Header className='page-header'>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key='changepsw' onClick={onChangePsw}>
              修改密码
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='logout' onClick={onLogout}>
              退出登录
            </Menu.Item>
          </Menu>
        }
      >
        <div className='user'>
          <Avatar size={34} icon={<UserOutlined />}>
            {username}
          </Avatar>
          <div className='dropdown-link'>
            <span className='name'>{username}</span>
          </div>
          <ModalPassword />
        </div>
      </Dropdown>
    </Header>
  )
}

export default LayoutHeader
