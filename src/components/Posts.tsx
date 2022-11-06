import React from 'react';
import Post from './Post';
import { IPost, Props } from '../interfaces';
import { useAppContext } from '../context';
const Posts: React.FC<Props> = () => {
	const { posts } = useAppContext();
	return (
		<ul className="row row-cols-1 row-cols-md-3 g-4 p-4">
			{posts.map((post: IPost) => (
				<Post key={post.id} {...post} />
			))}
		</ul>
	);
};

export default Posts;
