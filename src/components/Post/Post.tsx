import React, {useState} from 'react'

import styles from './post.module.css'
import {IPost} from '../../models/IPost'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {useDeletePostMutation, useEditPostMutation} from '../../services/PostService'
import {Alert, Paper, Snackbar} from '@mui/material'

interface PostProps {
	post: IPost;
}


const Post: React.FC<PostProps> = ({post}) => {
	const [edited, setEdited] = useState(false)

	const [deletePost, {}] = useDeletePostMutation()
	const [editPost, {}] = useEditPostMutation()

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}

		setEdited(false)
	}

	const handleDeletePost = (id: number) => {
		if (window.confirm("Are you sure you want to delete the message?")) {
			deletePost(id)
		}
	}

	const handleEditPost = async () => {
		const newTitle = await prompt('Enter new title:')
		const newBody = await prompt('Enter new body:')

		newTitle && newBody && editPost({id: post.id, title: newTitle, body: newBody, userId: post.userId})

		setEdited(true);
	}

	return (
		<>
			<Paper elevation={3} className={styles.post}>
				<h1 className={styles.title}>{post.id}. {post.title}</h1>
				<div className={styles.postRow}>
					<p className={styles.body}>{post.body}</p>
					<div>
						<DeleteIcon fontSize={'large'} className={styles.icon} onClick={() => handleDeletePost(post.id)} />
						<EditIcon fontSize={'large'} className={styles.icon} onClick={handleEditPost} />
					</div>
				</div>
			</Paper>
			<Snackbar open={edited} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="info" sx={{width: '100%'}}>
					Пост успешно изменен!
				</Alert>
			</Snackbar>
		</>
	)
}

export default Post