import { default as useRequestHooks } from '@ahooksjs/use-request'

function useRequest(service, options) {
  return useRequestHooks(service, {
    formatResult: (res) => res.data,
    ...options
  })
}
export default useRequest
