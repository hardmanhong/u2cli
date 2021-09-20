import request from '@/request'

export const login = (params) => {
  return request.post('/admin/login/check', params, {
    headers: { catchCode: true }
  })
}
