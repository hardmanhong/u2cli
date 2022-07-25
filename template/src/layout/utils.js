export const breadcrumbMap = {}
const urlToList = (url) => {
  if (!url || url === '/') {
    return ['/']
  }
  const urlList = url.split('/').filter(Boolean)
  return urlList.map((_, index) => `/${urlList.slice(0, index + 1).join('/')}`)
}
export const genMenuData = (routes) =>
  routes
    .filter((item) => item && (item.name || item.routes) && !item.hideInMenu)
    .map((item) => {
      if (
        item.routes &&
        Array.isArray(item.routes) &&
        !item.hideChildrenInMenu &&
        item.routes.some((child) => child && !!child.name)
      ) {
        const children = genMenuData(item.routes)
        if (children.length) return { ...item, routes: children }
      }
      return { ...item, routes: undefined }
    })
    .filter(Boolean)

export const getPaths = (pathname) => {
  const pathSnippets = urlToList(pathname)
  return pathSnippets
    .map((url) => {
      const currentItem = breadcrumbMap[url] || {}
      const {
        name,
        breadcrumb,
        hideInBreadcrumb,
        hideInBreadcrumbOnly = true
      } = currentItem
      return name
        ? {
            path: url,
            name,
            breadcrumb,
            hideInBreadcrumb,
            hideInBreadcrumbOnly
          }
        : { path: '', name: '' }
    })
    .filter((item) => item && item.path)
}
export const getBreadcrumb = (pathname) => {
  const list = getPaths(pathname)
  return list.length === 1
    ? list.filter((item) => !item.hideInBreadcrumbOnly)
    : list.filter((item) => !item.hideInBreadcrumb)
}

export const genBreadcrumbMap = (routes) => {
  if (!routes || !Array.isArray(routes)) return
  routes.forEach((item) => {
    if (item.path) breadcrumbMap[item.path] = item
    if (item.routes) genBreadcrumbMap(item.routes)
  })
}
export const getSelectedMenuKeys = (pathname) =>
  getPaths(pathname).map((item) => item.path)

export const getOpenMenuKeys = (selectedMenuKeys) =>
  selectedMenuKeys.slice(0, selectedMenuKeys.length - 1)
