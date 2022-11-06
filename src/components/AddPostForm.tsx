import React, { useEffect } from 'react';
import { useAppContext } from '../context';
import Button from './Button/Button';

const AddPost: React.FC = () => {
	const { addPost, handleChange,formData} = useAppContext();
	useEffect(()=>{},[])
	return (
		<>
			<form
				className="bg-light mx-auto w-75 p-2 m-2 rounded"
				onSubmit={e => {
					addPost(e);
				}}
			>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input
						type="text"
						name="title"
						id="title"
						className="form-control"
						onChange={handleChange}
						
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="content" className="form-label">
						content
					</label>
					<textarea
						name="content"
						id="content"
						className="form-control"
						onChange={handleChange}
					></textarea>
				</div>
				<div className="mb-3">
					<label htmlFor="image_url" className="form-label">
						Image URL
					</label>
					<input
						type="text"
						name="image_url"
						id="image_url"
						className="form-control"
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="lat" className="form-label">
						Latitude
					</label>
					<input
						type="text"
						name="lat"
						id="lat"
						className="form-control"
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="long" className="form-label">
						Longitude
					</label>
					<input
						type="text"
						name="long"
						id="long"
						className="form-control"
						onChange={handleChange}
					/>
				</div>
				<Button
					className="btn btn-primary"
					disabled={formData.title === '' || formData.content === ''}
					children="Add Post"
				/>
					
				
				
			</form>
		</>
	);
};

export default AddPost;
