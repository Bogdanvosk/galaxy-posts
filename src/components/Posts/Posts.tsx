import React, {useState} from 'react'
import {useFetchAllPostsQuery} from '../../services/PostService'


import {CircularProgress} from '@mui/material'
import styles from './posts.module.css'
import Post from '../Post/Post'

const Posts = () => {
	const {data: posts, error, isLoading} = useFetchAllPostsQuery(1)

	return (
		<>
			{posts && (
				<div className={styles.posts}>
					{posts && posts.map(post => {
						return (
							<Post key={post.id} post={post} />
						)
					})}
				</div>
			)}
			{isLoading && (
				<div className={styles.loader}>
					<CircularProgress />
				</div>
			)}


			{error && (
				<h1>Произошла ошибка загрузки постов</h1>
			)}

		</>
	)
}

export default Posts