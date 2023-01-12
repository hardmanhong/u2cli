import { usePaginated } from '@/hooks'
import { Button, message, Upload } from 'antd'
import { UButtonGroup, UPagination, USearchForm, UTable } from 'u2antd'
import * as api from './api'
import { formPropsFn, useTableStaticPropsFn } from './data'
import './index.scss'
import ModalEdit from './ModalEdit'

const REACT_APP_REQUEST_HOST = process.env.REACT_APP_REQUEST_HOST

const MemberList = () => {
  const { tableProps, pagination, params, run, onSearch } = usePaginated(
    api.getList
  )
  const onAdd = () => {
    ModalEdit.show()
  }
  const onDownload = () => {
    window.open(REACT_APP_REQUEST_HOST + '/demo/members_example.xlsx')
  }
  const onChange = ({ file }) => {
    if (file.response) {
      if (file?.response?.code == 200) {
        message.success('导入成功')
        onOk()
      } else {
        message.error(file?.response?.msg || '导入失败')
      }
    }
  }
  const onEdit = (record) => {
    ModalEdit.show(record)
  }
  const onStatus = ({ customer_id, status }) => {
    api.changeState({ customer_id, status: status === 1 ? 2 : 1 }).then(() => {
      onSearch()
    })
  }
  const onOk = () => {
    run({
      ...params?.[0],
      current: 1,
      pageSize: 10
    })
  }
  const [tableStaticProps, computedHeight] = useTableStaticPropsFn({
    onEdit,
    onStatus
  })
  const formProps = formPropsFn()
  return (
    <>
      <USearchForm
        {...formProps}
        onFinish={onSearch}
        onCollapsed={computedHeight}
      />
      <UTable
        name='员工管理'
        options={
          <UButtonGroup>
            <Button onClick={onAdd} type='primary'>
              添加员工
            </Button>
            <Button onClick={onDownload}>下载导入模板</Button>
            <Upload
              className='Upload'
              accept='.xlsx'
              showUploadList={false}
              action={REACT_APP_REQUEST_HOST + '/admin/members/import'}
              headers={{ token: window.sessionStorage.getItem('token') }}
              onChange={onChange}
            >
              <Button>导入员工</Button>
            </Upload>
          </UButtonGroup>
        }
        {...tableStaticProps}
        {...tableProps}
      />
      <UPagination {...pagination} />
      <ModalEdit onOk={onOk} />
    </>
  )
}

export default MemberList
