import React, { useEffect } from 'react';
import { useAppContext } from '../context';
import { useParams } from 'react-router-dom';
import Button from './Button/Button';
const EditPost: React.FC = () => {
	const { handelUpdate, handleChange, formData, setFormData } = useAppContext();
	const { id } = useParams();
	useEffect(() => {
		const getPostById = async () => {
			const resp = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
			const res = await resp.json();
			setFormData(await res);
		};
		getPostById();
	}, [id, setFormData]);
	return (
		<>
			<form
				className="bg-light mx-auto w-75 p-2 m-2 rounded"
				onSubmit={e => {
					handelUpdate(e, Number(id));
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
						value={formData.title || ''}
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
						value={formData.content || ''}
					>
						{formData.content}
					</textarea>
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
						value={formData.image_url || ''}
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
						value={formData.lat || ''}
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
						value={formData.long || ''}
					/>
				</div>
				<Button
					disabled={formData.title === '' || formData.content === ''}
					className="btn btn-primary"
					children="Update Post"
				/>
			</form>
		</>
	);
};

export default EditPost;
