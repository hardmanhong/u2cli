import React, { useEffect, useState } from 'react'
import { Button } from 'antd'

const Test = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log('test')
    return () => {
      console.log('rest destory')
    }
  }, [])
  return (
    <div>
      test
      <h1>count: {count}</h1>
      <Button
        onClick={() => {
          setCount((c) => c + 1)
        }}
      >
        +
      </Button>
    </div>
  )
}

export default Test
