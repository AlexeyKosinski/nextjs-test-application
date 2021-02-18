import Posts from './Posts'
import AuthPage from '../../components/AuthPage'
import { PostProvider } from '../../contexts/Post'
import api from '../../services/api'

export async function getServerSideProps(context) {
  try {
    const posts = await api.http.get('https://jsonplaceholder.typicode.com/posts')
    return {
      props: { posts }, // Will be passed to the page component as props
    }
  } catch (e) {
    console.log(e)
    return {
      props: { posts: [] }, // Will be passed to the page component as props
    }
  }

}

const UsersContainer = ({ posts }) => {
  return (
    <AuthPage title={'Posts'}>
      <PostProvider>
        <Posts posts={posts}/>
      </PostProvider>
    </AuthPage>
  )
}
export default UsersContainer
