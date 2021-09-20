import { usePaginated as u2usePaginated } from 'u2hooks'

export default function usePaginated(service, options) {
  return u2usePaginated(service, {
    alias: {
      list: 'data.data',
      total: 'data.total',
      current: 'page',
      pageSize: 'pageSize'
    },
    ...options
  })
}
