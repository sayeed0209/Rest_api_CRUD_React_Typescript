import React from 'react';
import {
	Routes,
	Route,
	
} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import AddPost from './components/AddPostForm';
import EditPost from './components/EditPostForm';
import SinglePost from './components/SinglePost';
import { useAppContext } from './context';
import ErrorBoundary from './components/Error';

function App() {
	const { isLoading, error } = useAppContext();

	if (isLoading) {
		return (
			<main>
				<div className="loading-spinner"></div>
			</main>
		);
	}
	if (error) {
		return (
			<main>
				<div className="alert alert-danger" role="alert">
					<h3>Opps!, something went wrong</h3>
				</div>
			</main>
		);
	}
	return (
		<ErrorBoundary>
			<Navbar />
			<main className="container mt-5">
				<Routes>
					<Route path="/" element={<Posts />} />
					<Route path="/create-post" element={<AddPost />} />
					<Route path="/edit-post/:id" element={<EditPost />} />
					<Route path="/posts/:id" element={<SinglePost />} />
				</Routes>
			</main>
		</ErrorBoundary>
	);
}

export default App;
