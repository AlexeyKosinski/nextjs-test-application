import styles from '../../styles/User.module.sass'
import { useUserContext } from '../../contexts/User'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { FormController, useControllerState } from '../../services/controller-context'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

const EditUser = (props) => {
  const { user = {} } = props
  const { updateUser } = useUserContext()
  const router = useRouter()

  const { formData, submit, fieldProps } = useControllerState(
    new FormController({
      formData: {
        ...user,
        companyName: (user.company && user.company.name) || '',
        companyCatchPhrase: (user.company && user.company.catchPhrase) || '',
        companyBs: (user.company && user.company.bs) || '',
        addressCity: (user.address && user.address.city) || '',
        addressStreet: (user.address && user.address.street) || '',
        addressSuite: (user.address && user.address.suite) || '',
        addressZipCode: (user.address && user.address.zipcode) || '',
        addressLat: (user.address && user.address.geo && user.address.geo.lat) || '',
        addressLng: (user.address && user.address.geo && user.address.geo.lng) || '',
      },
    }),
  )
  const goToUsers = useCallback(() => {
    router.push(`/users`)
  }, [formData])
  const onUpdateUser = useCallback(() => {
    submit(updateUser).then(() => {
      goToUsers()
    })
  }, [formData, submit, goToUsers])
  return (
    <div className={styles.user}>
      <div className={styles.editGroup}>
        <Button onClick={goToUsers} color={'primary'}>Back</Button>
        <Button onClick={onUpdateUser} color={'secondary'}>Update User</Button>
      </div>

      <div>
        <Grid container spacing={3}>
          <Grid item sm={4} xs={12}>
            <Paper className={styles.editGroup}>
              <Typography className={styles.groupTitle} variant='h6'>Personal</Typography>
              <div>
                <TextField name={'name'} label={'Name'} {...fieldProps}/>
              </div>
              <div>
                <TextField name={'username'} label={'Username'} {...fieldProps}/>
              </div>
              <div>
                <TextField name={'email'} label={'Email'} {...fieldProps}/>
              </div>
              <div>
                <TextField name={'phone'} label={'Phone'} {...fieldProps}/>
              </div>
              <div>
                <TextField name={'website'} label={'Website'} {...fieldProps}/>
              </div>
            </Paper>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Paper className={styles.editGroup}>
              <Typography className={styles.groupTitle} variant='h6'>Company</Typography>
              <div><TextField name={'companyName'} label={'Name'} {...fieldProps}/></div>
              <div><TextField name={'companyCatchPhrase'} label={'Catch Prase'} {...fieldProps}/></div>
              <div><TextField name={'companyBs'} label={'BS'} {...fieldProps}/></div>
            </Paper>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Paper className={styles.editGroup}>
              <Typography className={styles.groupTitle} variant='h6'>Address</Typography>
              <div><TextField name={'addressCity'} label={'City'} {...fieldProps}/></div>
              <div><TextField name={'addressStreet'} label={'Street'} {...fieldProps}/></div>
              <div><TextField name={'addressSuite'} label={'Suite'} {...fieldProps}/></div>
              <div><TextField name={'addressZipCode'} label={'Zipcode'} {...fieldProps}/></div>
              <div><TextField name={'addressLat'} label={'Lat'} {...fieldProps}/></div>
              <div><TextField name={'addressLng'} label={'Lng'} {...fieldProps}/></div>
            </Paper>
          </Grid>
        </Grid>
      </div>


    </div>
  )
}

export default EditUser
