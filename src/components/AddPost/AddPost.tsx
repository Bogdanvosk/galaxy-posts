import React, {useState} from 'react'
import {useForm, SubmitHandler, Controller} from 'react-hook-form'
import {useCreatePostMutation} from '../../services/PostService'
import {IPost} from '../../models/IPost'

import {Alert, Button, Paper, Snackbar, TextField, Typography} from '@mui/material'

import styles from './addPost.module.css'

type Inputs = {
	title: string,
	body: string,
	userId: number
};

const AddPost = () => {
	const {control, handleSubmit, resetField, formState: {errors}} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = data => {
		createPost(data as IPost)
		resetField('title')
		resetField('body')
		resetField('userId')
		setOpen(true)
	}

	const [open, setOpen] = useState(false)

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}


	const [createPost, {error}] = useCreatePostMutation()

	return (
		<Paper variant="outlined" className={styles.addPost}>
			<Typography className={styles.addPostTitle} fontSize={32}>
				Add new post
			</Typography>

			<form className={styles.addPostControls}>
				<Controller name="title" control={control} defaultValue=""
							rules={{required: true}}
							render={({field}) => <TextField label="Enter your title" {...field} />} />

				{errors.title && <Alert severity="error">
					Enter correct <strong>title</strong>, please!
				</Alert>}

				<Controller name="body" control={control} defaultValue=""
							rules={{required: true}}
							render={({field}) => <TextField label="Enter your body" {...field} />} />

				{errors.body && <Alert severity="error">
					Enter correct <strong>body</strong>, please!
				</Alert>}

				<Controller name="userId" control={control} defaultValue={0}
							rules={{required: true, min: 1}}
							render={({field}) => <TextField label="Enter your user ID" {...field} />} />

				{errors.userId && <Alert severity="error">
					Enter correct <strong>user ID</strong>, please!
				</Alert>}

				<Button
					onClick={handleSubmit(onSubmit)}
					variant="outlined">
					Add post
				</Button>

			</form>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
					Пост успешно добавлен!
				</Alert>
			</Snackbar>
			{error && (
				<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
						Ой-ой, произошла ошибка!
					</Alert>
				</Snackbar>
			)}
		</Paper>
	)
}

export default AddPost