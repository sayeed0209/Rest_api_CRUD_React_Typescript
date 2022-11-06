import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPost, TodoContextType, Props } from './interfaces';
import Swal from 'sweetalert2';
const PostContext = React.createContext<TodoContextType | null>(null);
export const AppProvider: React.FC<Props> = ({ children }) => {
	const [posts, setPosts] = useState<IPost[]>([
		
	]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		content: '',
		image_url: '',
		lat: '',
		long: '',
	});
	const [singlePost, setSinglePost] = useState<IPost | {}>({
		title: '',
		content: '',
		image_url: '',
		lat: '',
		long: '',
	});
	const navigate = useNavigate();
	const handleChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setFormData({
			...formData,
			[e.currentTarget.name]: e.currentTarget.value,
		});
	};
	const fetchPosts = async () => {
		setIsLoading(true);
		try {
			const resp = await fetch(`${process.env.REACT_APP_API_URL}`);
			const result = await resp.json();
			setPosts(result);
			setError(false);
		} catch (error) {
			setIsLoading(false);
			setError(true);
		} finally {
			setIsLoading(false);
		}
	};
	const addPost = async (e: React.FormEvent<EventTarget>) => {
		e.preventDefault();
		if (formData.title === '' || formData.content === '') {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Please enter title and description to create a post',
				footer: '<a href="">Why do I have this issue?</a>',
			});
			return;
		} else {
			try {
				const resp = await fetch(`${process.env.REACT_APP_API_URL}`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				});
				if (resp.status === 201) {
					Swal.fire(
						'Good job!',
						'Post has been created successfully!',
						'success'
					);
					fetchPosts();
					navigate('/');
				}
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	const handelDelete = async (id: number) => {
		const resp = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
			method: 'DELETE',
		});
		if (resp.status === 204) {
			Swal.fire('Okay!', 'Post has been deleted successfully!', 'warning');
			fetchPosts();
			navigate('/');
		}
	};
	const handelUpdate = async (e: React.FormEvent<EventTarget>, id: number) => {
		e.preventDefault();
		const resp = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});
		if (resp.status === 200) {
			Swal.fire('Success!', 'Post has been updated successfully!', 'info');
			fetchPosts();
			navigate('/');
		}
	};
	const showSinglePost = async (id: number) => {
		const resp = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
		const result = await resp.json();
		setSinglePost(result);
	};
	useEffect(() => {
		fetchPosts();
	}, []);
	return (
		<PostContext.Provider
			value={{
				posts,
				isLoading,
				error,
				addPost,
				handleChange,
				handelDelete,
				handelUpdate,
				formData,
				setFormData,
				showSinglePost,
				singlePost,
			}}
		>
			{children}
		</PostContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(PostContext) as TodoContextType;
};
