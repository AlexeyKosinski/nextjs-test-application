import React, { useCallback } from 'react'
import Head from './Head'
import Footer from './Footer'
import styles from '../styles/Page.module.sass'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useAuthContext } from '../contexts/Auth'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))
const Page = (props) => {
  const { title, children, mainClassName } = props
  const router = useRouter()
  const classes = useStyles()
  const { state: {user:{ isAuthenticated, name, lastName }}, signOut } = useAuthContext()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget)
  }, [setAnchorEl])

  const logOut = useCallback((event) => {
    signOut()
    router.push('/')
  }, [signOut, router])


  const to = useCallback((routeTo) => () => {
    router.push(routeTo)
    handleClose()
  }, [handleClose, router])

  return (
    <>
      <Head title={title}/>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={handleClick}
              edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon/>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {isAuthenticated && <MenuItem onClick={to('/users')}>Users</MenuItem>}
              {isAuthenticated && <MenuItem onClick={to('/posts')}>Posts</MenuItem>}
              {isAuthenticated && <MenuItem onClick={logOut}>Logout</MenuItem>}
              {!isAuthenticated && <MenuItem onClick={to('/login')}>Login</MenuItem>}
            </Menu>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
            {isAuthenticated && (
              <div>{name} {lastName}</div>
            )}

          </Toolbar>
        </AppBar>
      </div>


      <div className={styles.container}>
        <main className={mainClassName || styles.main}>
          {children}
        </main>
        <Footer/>
      </div>
    </>
  )
}
export default Page
