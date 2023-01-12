import { Form, message } from 'antd'
import { useMemo } from 'react'
import { UForm, UModal } from 'u2antd'
import { add, edit } from './api'
import { editFormListFn } from './data'

const ModalEdit = ({ onOk }) => {
  const payload = UModal.usePayload(ModalEdit, {})
  const [form] = Form.useForm()
  const handleOk = () => {
    form.validateFields().then((values) => {
      const successCallback = (msg) => {
        message.success(msg)
        ModalEdit.hide()
        onOk && onOk()
      }
      if (payload.customer_id) {
        edit({ ...values, customer_id: payload.customer_id }).then(() => {
          successCallback('编辑成功')
        })
      } else {
        add(values).then(() => {
          successCallback('添加成功')
        })
      }
    })
  }
  const editFormList = useMemo(() => editFormListFn(), [])
  const title = payload?.customer_id ? '编辑员工' : '添加员工'
  return (
    <UModal forceRender title={title} onOk={handleOk}>
      <UForm
        form={form}
        list={editFormList}
        footer={null}
        initialValues={payload}
      />
    </UModal>
  )
}
export default ModalEdit
