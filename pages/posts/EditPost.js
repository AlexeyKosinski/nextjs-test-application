import { usePostContext } from '../../contexts/Post'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import Typography from '@material-ui/core/Typography'

import { FormController, useControllerState } from '../../services/controller-context'
import React, { useCallback } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
const EditPost = (props) => {
  const { post = {}, onClose } = props
  const { updatePost } = usePostContext()
  const classes = useStyles()
  const { formData, submit, fieldProps } = useControllerState(
    new FormController({
      formData: {
        ...post,
      },
    }),
  )
  const onUpdatePost = useCallback(() => {
    submit(updatePost).then(() => {
      onClose()
    })
  }, [formData, submit])
  return (
    <Dialog fullScreen open={!!post} onClose={onClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            #{post.id} {formData.title}
          </Typography>
          <Button autoFocus color="secondary" onClick={onUpdatePost}>
            update post
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem button>
          <TextField name={'title'} label={'Title'} {...fieldProps}/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <TextField name={'body'} label={'Body'} multiline {...fieldProps}/>
        </ListItem>
      </List>
    </Dialog>
  )
}

export default EditPost
