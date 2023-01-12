import { useRef, useState, useEffect } from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import * as api from './api'
const REACT_APP_COS = process.env.REACT_APP_COS

const Uploader = ({ value, onChange, maxCount = 1, ...props }) => {
  const [fileList, setFileList] = useState([])
  useEffect(() => {
    if (!value) setFileList([])
    if (typeof value === 'string') {
      setFileList([{ url: value, name: value.match(/[\\\/]?([^\\\/]+)$/)[1] }])
    }
    if (value?.url) {
      setFileList([{ ...value }])
    }
    if (Array.isArray(value))
      setFileList(
        value.map((item) => ({
          ...item,
          name: item?.url?.match(/[\\\/]?([^\\\/]+)$/)[1]
        }))
      )
  }, [value])
  const COSData = useRef({})
  const getUploadConfig = async () => {
    try {
      const config = await api.uploadUrl()
      COSData.current = config.data
    } catch (error) {
      message.error('获取COS签名出错')
      console.log('获取COS签名出错', error)
    }
  }
  const beforeUpload = (file) => {
    return new Promise(async (reslove, reject) => {
      await getUploadConfig()
      if (!COSData.current.key) {
        return reject(Upload.LIST_IGNORE)
      }
      file.url = [COSData.current.key, file.name].join('/')
      reslove(file)
    })
  }
  const handleChange = ({ file, fileList }) => {
    setFileList([...fileList])
    if (file.status === 'done' && file.url) {
      if (maxCount === 1) {
        onChange(file)
      } else {
        onChange(fileList)
      }
    }
  }
  const getExtraData = (file) => {
    return {
      key: file.url,
      success_action_status: 200,
      Signature: COSData.current.Signature,
      'x-cos-security-token': COSData.current.XCosSecurityToken
    }
  }
  const selfPprops = {
    name: 'file',
    maxCount,
    listType: 'picture',
    fileList: fileList.map((item) => ({
      ...item,
      url: [REACT_APP_COS, item.url].join('/')
    })),
    action: REACT_APP_COS,
    data: getExtraData,
    beforeUpload,
    onChange: handleChange
  }
  return (
    <Upload {...selfPprops} {...props}>
      <Button icon={<UploadOutlined />}>选择文件</Button>
    </Upload>
  )
}

export default Uploader
