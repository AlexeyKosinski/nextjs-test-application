import Users from './Users'
import AuthPage from '../../components/AuthPage'
import { UserProvider } from '../../contexts/User'
import api from '../../services/api'

export async function getServerSideProps(context) {
  try {
    const users = await api.http.get('https://jsonplaceholder.typicode.com/users')
    return {
      props: { users }, // Will be passed to the page component as props
    }
  } catch (e) {
    console.log(e)
    return {
      props: { users: [] }, // Will be passed to the page component as props
    }
  }

}

const UsersContainer = ({ users }) => {
  return (
    <AuthPage title={'Users'}>
      <UserProvider>
        <Users users={users}/>
      </UserProvider>
    </AuthPage>
  )
}
export default UsersContainer
