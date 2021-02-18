import { AuthProvider } from '../../contexts/Auth'
import AuthPage from './AuthPage'
import styles from '../../styles/Page.module.sass'

const AuthPageContainer = (props) => {
  return (
    <AuthProvider>
      <AuthPage {...props} mainClassName={styles.mainAuth}/>
    </AuthProvider>
  )
}
export default AuthPageContainer
