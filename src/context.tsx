import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPost, TodoContextType, Props } from './interfaces';
import Swal from 'sweetalert2';
const PostContext = React.createContext<TodoContextType | null>(null);
export const AppProvider: React.FC<Props> = ({ children }) => {
	const [posts, setPosts] = useState<IPost[]>([
		{
			id: 1,
			title: 'Madrid',
			content:
				'Madrid is the capital of Spain and the largest municipality in both the Community of Madrid and Spain as a whole.',
			lat: '40.41678',
			long: '-3.70379',
			image_url:
				'https://c2.staticflickr.com/2/1269/4670777817_d657cd9819_b.jpg',
			created_at: '2022-06-20T12:09:47.921Z',
			updated_at: '2022-06-20T12:09:47.921Z',
		},
		{
			id: 102,
			title: 'Barcelona',
			content:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
			lat: '',
			long: '',
			image_url:
				'https://images.unsplash.com/photo-1667499745120-f9bcef8f584e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80',
			created_at: '2022-11-05T21:16:38.954Z',
			updated_at: '2022-11-06T12:25:27.009Z',
		},
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
