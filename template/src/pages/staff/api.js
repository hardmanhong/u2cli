import request from '@/request'

export const getList = (params) => {
  return request.post('/admin/members/index', params)
}
export const detail = (params) => {
  return request.post('/admin/members/detail', params)
}
export const add = (params) => {
  return request.post('/admin/members/add', params)
}
export const edit = (params) => {
  return request.post('/admin/members/edit', params)
}
export const changeState = (params) => {
  return request.post('/admin/members/changeState', params)
}
export const position = (params) => {
  return request.post('/admin/members/position', params)
}
export const importMembers = (params) => {
  return request.post('/admin/members/import', params)
}
export const exportMembers = (params) => {
  return request.post('/admin/members/export', params, {
    responseType: 'blob'
  })
}
