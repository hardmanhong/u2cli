import React, { useState, useContext } from 'react'

const BreadcrumbStateContext = React.createContext()
const BreadcrumbLogDispatcherContext = React.createContext()

export function useGetBreadcrumb() {
  return useContext(BreadcrumbStateContext)
}
/**
 *
 * setBreadcrumb [<item>] <item> : {path:string,name:string}
 */
export function useSetBreadcrumb() {
  return useContext(BreadcrumbLogDispatcherContext)
}
export function useBreadcrumb() {
  return [useGetBreadcrumb(), useSetBreadcrumb()]
}

function BreadcrumbProvider({ children }) {
  const [breadcrumb, setBreadcrumb] = useState([])
  return (
    <BreadcrumbLogDispatcherContext.Provider value={setBreadcrumb}>
      <BreadcrumbStateContext.Provider value={breadcrumb}>
        {children}
      </BreadcrumbStateContext.Provider>
    </BreadcrumbLogDispatcherContext.Provider>
  )
}

export default BreadcrumbProvider
