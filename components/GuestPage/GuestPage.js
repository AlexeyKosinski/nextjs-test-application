import React,{ useEffect } from 'react'
import Page from '../Page'
import { useRouter } from 'next/router'
import { useAuthContext } from '../../contexts/Auth'

const GuestPage =  (props) => {
  const { state: { user:{isAuthenticated} } } = useAuthContext()

  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/users')
    }
  }, [router, isAuthenticated])

  return (
    <Page {...props}/>
  )
}

export default GuestPage
