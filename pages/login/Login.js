import { useCallback } from 'react'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import { useAuthContext } from '../../contexts/Auth'
import { FormController, useControllerState } from '../../services/controller-context'
import Typography from '@material-ui/core/Typography'
import styles from '../../styles/Login.module.sass'

const Login = () => {

  const { formData, submit, fieldProps } = useControllerState(
    new FormController({
      formData: {
        username: '',
        password: '',
      },
    }),
  )
  const { logIn } = useAuthContext()

  const onSignIn = useCallback(() => {
    submit(logIn)
  }, [formData, submit])

  return (
    <>
      <Typography variant="h3" color='primary'>
        Hello, please Sign In
      </Typography>

      <div className={styles.container}>
        {fieldProps.errors && fieldProps.errors.error && (
          <>
            <Typography color='error'>{fieldProps.errors.error}</Typography>
            <Typography color='error'>please use 'u' as username and 'p' as password</Typography>
          </>
        )}
        <p>
          <TextField label="Username" name='username' {...fieldProps}/>
        </p>
        <p>
          <TextField label="Password" name='password' {...fieldProps}/>
        </p>
        <Button onClick={onSignIn} color="primary" fullWidth>
          Sign In
        </Button>
      </div>
    </>
  )
}
export default Login
