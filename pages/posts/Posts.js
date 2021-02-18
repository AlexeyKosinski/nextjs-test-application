import React, { useCallback, useEffect, useState } from 'react'
import styles from '../../styles/Post.module.sass'
import { usePostContext } from '../../contexts/Post'
import PostTable from './PostTable'
import EditPost from './EditPost'

const Posts = (props) => {
  const { posts = [] } = props
  const [editPost, setEditPost] = useState()

  const { pagination: { getPaginationProps }, setList } = usePostContext()
  const [, setData] = useState()

  useEffect(() => {
    setList(posts)
    setData(getPaginationProps())
  }, [setList, posts, getPaginationProps, setData])

  const handleClose = useCallback(() => {
    setEditPost(null)
  }, [setEditPost])
  return (
    <div className={styles.post}>
      {editPost && (
        <EditPost post={editPost} onClose={handleClose}/>
      )}
      <PostTable getPaginationProps={getPaginationProps} onEditPost={setEditPost}/>

    </div>
  )
}

export default Posts
