import React, { useEffect } from 'react';
import moment from 'moment';
import { Link, useParams} from 'react-router-dom';
import { useAppContext } from '../context';
import fallBackImg from '../asset/img/fallbackImg.jpeg';
const SinglePost: React.FC = () => {
	const {id}= useParams();
    const {singlePost,showSinglePost} = useAppContext()
    useEffect(()=>{
        showSinglePost(Number(id))
    },[id,showSinglePost])

	return (
		<div className="card text-center w-50 vh-50 mx-auto">
			<div className="card-header">Post details</div>
            <img
					src={singlePost.image_url}
					alt={singlePost.title}
					className="card-img-top post-image"
					onError={(e) => {
						e.currentTarget.src= fallBackImg 
					
					 }}
				/>
			<div className="card-body">
				<h5 className="card-title">{singlePost.title}</h5>
				<p className="card-text">{singlePost.content}</p>
				<Link to="/" className="btn btn-outline-info">
					Go back home
				</Link>
			</div>
			<div className="card-footer text-muted">{moment(singlePost.created_at).fromNow()}</div>
		</div>
	);
};

export default SinglePost;
