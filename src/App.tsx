import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from './hooks/redux'
import Posts from './components/Posts/Posts'
import AddPost from './components/AddPost/AddPost'

function App() {
	return (
		<div className="posts">
			<AddPost />
			<Posts />
		</div>
	)
}

export default App