import request from '@/request'

export const uploadUrl = (params) => {
  return request.post('/admin/stock/uploadUrl', params)
}
