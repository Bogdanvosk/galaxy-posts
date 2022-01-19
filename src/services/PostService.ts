import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {IPost} from '../models/IPost'

export const postApi = createApi({
	reducerPath: 'postAPI',
	baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
	tagTypes: ['Post'],
	endpoints: build => ({
		fetchAllPosts: build.query<IPost[], number>({
			query: () => ({
				url: `posts`,
			}),
			providesTags: result => ['Post']
		}),
		createPost: build.mutation<IPost, IPost>({
			query: (post) => ({
				url: `posts`,
				method: 'POST',
				body: post
			}),
			invalidatesTags: ['Post']
		}),
		deletePost: build.mutation<IPost, number>({
			query: (id: number) => ({
				url: `posts/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Post']
		}),
		editPost: build.mutation<IPost, IPost>({
			query: (post) => ({
				url: `posts/${post.id}`,
				method: 'PUT',
				body: post
			}),
			invalidatesTags: ['Post']
		})
	})
})

export const {useFetchAllPostsQuery, useCreatePostMutation, useDeletePostMutation, useEditPostMutation} = postApi