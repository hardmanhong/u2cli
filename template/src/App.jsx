import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import routes from './router'
import UseRequestProviderWithError from './UseRequestProviderWithError'
function App() {
  return (
    <ConfigProvider locale={zh_CN}>
      <Router>
        <UseRequestProviderWithError>{routes}</UseRequestProviderWithError>
      </Router>
    </ConfigProvider>
  )
}

export default App
