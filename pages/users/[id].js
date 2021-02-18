import EditUser from './EditUser'
import AuthPage from '../../components/AuthPage'
import { UserProvider } from '../../contexts/User'
import api from '../../services/api'

export async function getServerSideProps(context) {
  try {
    const user = await api.http.get(`https://jsonplaceholder.typicode.com/users/${context.params.id}`)
    return {
      props: { user }, // Will be passed to the page component as props
    }
  } catch (e) {
    console.log(e)
    return {
      props: { user: {} }, // Will be passed to the page component as props
    }
  }

}

const UserContainer = ({ user }) => {
  return (
    <AuthPage title={`Edit User: ${user.name} #${user.id}`}>
      <UserProvider>
        <EditUser user={user}/>
      </UserProvider>
    </AuthPage>
  )
}
export default UserContainer
