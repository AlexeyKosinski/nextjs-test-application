import { AuthProvider } from '../../contexts/Auth'
import GuestPage from './GuestPage'

const GuestPageContainer = (props) => {
  const { title, children } = props
  return (
    <AuthProvider>
      <GuestPage {...props}/>
    </AuthProvider>
  )
}

export default GuestPageContainer
