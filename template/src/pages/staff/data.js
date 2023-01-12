import { Input, Select, Popconfirm, Button } from 'antd'
import { UButtonGroup } from 'u2antd'
import { computedScroll } from '@/utils'
import { useTableScroll } from '@/hooks'

export const gender = [
  {
    value: 1,
    label: '男'
  },
  {
    value: 2,
    label: '女'
  },
  {
    value: 3,
    label: '未知'
  }
]

export const formPropsFn = () => ({
  list: [
    {
      props: {
        name: 'name',
        label: '姓名'
      },
      component: <Input allowClear placeholder='请输入名字' />
    },
    {
      props: {
        name: 'sex',
        label: '性别'
      },
      component: (
        <Select placeholder='默认全部' allowClear>
          {gender.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      )
    },
    {
      props: {
        name: 'phone',
        label: '手机号码'
      },
      component: <Input allowClear placeholder='请输入手机号码' />
    },
    {
      props: {
        name: 'position',
        label: '职位'
      },
      component: <Input allowClear placeholder='请输入职位' />
    }
  ]
})

export const editFormListFn = () => [
  {
    props: {
      name: 'customer_name',
      label: '姓名',
      rules: [{ required: true, message: '请输入姓名' }]
    },
    component: <Input />
  },
  {
    props: {
      name: 'position',
      label: '职位',
      rules: [{ required: true, message: '请输入职位' }]
    },
    component: <Input allowClear placeholder='请输入职位' />
  },
  {
    props: {
      name: 'sex',
      label: '性别',
      rules: [{ required: true, message: '请选择性别' }]
    },
    component: (
      <Select placeholder='请选择'>
        {gender.map((item) => (
          <Select.Option key={item.value} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
    )
  },
  {
    props: {
      name: 'phone',
      label: '手机号码',
      rules: [
        { required: true, message: '请输入手机号码' },
        { pattern: /^1[0-9]\d{9}$/, message: '手机号格式不正确' }
      ]
    },
    component: <Input />
  }
]

const Actions = ({ record, onEdit, onStatus }) => {
  const handleEdit = () => {
    onEdit(record)
  }
  const handleStatus = () => {
    onStatus(record)
  }
  return (
    <UButtonGroup>
      <Button type='link' onClick={handleEdit}>
        编辑
      </Button>
      {record.status === 1 && (
        <Popconfirm
          title='离职后该员工不可登录小程序，确定操作吗？'
          onConfirm={handleStatus}
        >
          <Button type='link' danger>
            离职
          </Button>
        </Popconfirm>
      )}
      {record.status === 2 && (
        <Popconfirm
          title='在职后该员工可正常登录小程序，确定操作吗？'
          onConfirm={handleStatus}
        >
          <Button type='link'>在职</Button>
        </Popconfirm>
      )}
    </UButtonGroup>
  )
}

export const useTableStaticPropsFn = (action) => {
  const [height, computedHeight] = useTableScroll()
  const columns = [
    {
      width: 120,
      title: '序号',
      key: 'customer_id',
      dataIndex: 'customer_id',
      render: (_, __, index) => index + 1
    },
    {
      width: 120,
      title: '姓名',
      key: 'customer_name',
      dataIndex: 'customer_name'
    },
    {
      width: 120,
      title: '职位',
      key: 'position',
      dataIndex: 'position'
    },
    {
      width: 120,
      title: '性别',
      key: 'sex',
      dataIndex: 'sex',
      render: (value) => gender.find((item) => item.value === value)?.label
    },
    {
      width: 120,
      title: '手机号码',
      key: 'phone',
      dataIndex: 'phone'
    },
    {
      width: 120,
      title: '发布数量',
      key: 'nums',
      dataIndex: 'nums'
    },
    {
      title: '发布总金额（元）',
      key: 'total_money',
      dataIndex: 'total_money'
    },
    {
      width: 120,
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      fixed: 'right',
      render: (_, record) => <Actions record={record} {...action} />
    }
  ]
  return [
    {
      rowKey: 'customer_id',
      columns,
      scroll: computedScroll(columns, 200, height)
    },
    computedHeight
  ]
}
