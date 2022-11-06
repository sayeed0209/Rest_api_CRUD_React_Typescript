import React from 'react';
import { Link } from 'react-router-dom';
import fallBackImg from '../asset/img/fallbackImg.jpeg';
import { IPost } from '../interfaces';

import { useAppContext } from '../context';
import Button from './Button/Button';
const Post: React.FC<IPost> = ({ id, title, image_url, content }) => {
	const { handelDelete } = useAppContext();

	return (
		<li className="col">
			<div className="card h-100">
				<img
					src={image_url}
					alt={title}
					className="card-img-top post-image"
					onError={(e) => {
						e.currentTarget.src= fallBackImg 
					 }}
				/>
				<div className="card-body">
					<h5 className="card-title">{title}</h5>
					<p className="card-text">{content}</p>
				</div>
				<div className="d-flex justify-content-between align-items-center p-2" >
					<Link className="btn btn-outline-info " to={`/posts/${id}`}>
						Show Post Details
					</Link>
					<div className="d-flex justify-content-between align-items-center m-2">
						<Link className="btn btn-outline-warning me-1 " to={`/edit-post/${id}`}>
							Edit
						</Link>
						<Button
							className="btn btn-outline-danger"
							onClick={() => {
								handelDelete(id);
							}}
							children='Delete'
						/>
						
						
					</div>
				</div>
			</div>
		</li>
	);
};

export default Post;
