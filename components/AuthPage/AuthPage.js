import { useEffect } from 'react'
import Page from '../Page'
import { useRouter } from 'next/router'
import { useAuthContext } from '../../contexts/Auth'

const AuthPage = (props) => {
  const { state: { user:{isAuthenticated} } } = useAuthContext()
  const router = useRouter()
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [router, isAuthenticated])
  return (
    <Page {...props}/>
  )
}
export default AuthPage
