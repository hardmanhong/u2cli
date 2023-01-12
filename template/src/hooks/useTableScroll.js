import { useState, useEffect, useRef, useCallback } from 'react'

function useTableScroll() {
  const [height, setHeight] = useState(0)
  const timer = useRef()
  const computedHeight = useCallback(() => {
    timer.current = setTimeout(() => {
      const tableThead = document.querySelector('.ant-table-header')
      const { bottom } = tableThead?.getBoundingClientRect() || { bottom: 0 }
      const pagination = document.querySelector('.u2antd-pagination')
      const paginationHeight = pagination?.offsetHeight || 0
      const scrollHeight = `calc(100vh - ${bottom + paginationHeight + 16}px)`
      setHeight(scrollHeight)
    })
  }, [])
  useEffect(() => {
    computedHeight()
    return () => {
      clearTimeout(timer.current)
    }
  }, [])
  return [height, computedHeight]
}

export default useTableScroll
