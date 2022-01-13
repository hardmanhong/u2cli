export {
  default as BreadcrumbProvider,
  useBreadcrumb,
  useGetBreadcrumb,
  useSetBreadcrumb
} from './BreadcrumbProvider'

export function composeProviders(...providers) {
  return ({ children }) =>
    providers.reduce((prev, Provider) => <Provider>{prev}</Provider>, children)
}
