import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import routes from './routes'
import UseRequestProviderWithError from './UseRequestProviderWithError'
import { BreadcrumbProvider } from './provider'
function App() {
  return (
    <ConfigProvider locale={zh_CN}>
      <BreadcrumbProvider>
        <Router>
          <UseRequestProviderWithError>{routes}</UseRequestProviderWithError>
        </Router>
      </BreadcrumbProvider>
    </ConfigProvider>
  )
}

export default App
