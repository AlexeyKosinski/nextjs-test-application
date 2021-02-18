import Page from '../components/Page'

import Link from 'next/link'

export default function Home() {
  return (
    <Page title={'Login'}>

      <h1>
        Welcome to Test application
      </h1>

      <p>
        Please login here {' '}
        <Link href={'/login'}>Log in</Link>
      </p>
    </Page>
  )
}



