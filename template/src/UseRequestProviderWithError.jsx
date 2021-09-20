import { UseRequestProvider } from '@ahooksjs/use-request'
import { useHistory } from 'react-router-dom'

const UseRequestProviderWithError = ({ children }) => {
  const history = useHistory()
  const onError = (error) => {
    if (error?.code == 509) history.push('/login')
  }
  return (
    <UseRequestProvider value={{ throwOnError: true, onError }}>
      {children}
    </UseRequestProvider>
  )
}

export default UseRequestProviderWithError
