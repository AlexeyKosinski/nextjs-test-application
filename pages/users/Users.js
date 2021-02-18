import { useEffect, useState } from 'react'
import styles from '../../styles/User.module.sass'
import { useUserContext } from '../../contexts/User'
import UserTable from './UserTable'

const Users = (props) => {
  const { users = [] } = props
  const { pagination: { getPaginationProps }, setList } = useUserContext()
  const [, setData] = useState()

  useEffect(() => {
    setList(users)
    setData(getPaginationProps())
  }, [setList, users, getPaginationProps, setData])

  return (
    <div className={styles.user}>
      <UserTable getPaginationProps={getPaginationProps}/>
    </div>
  )
}

export default Users
