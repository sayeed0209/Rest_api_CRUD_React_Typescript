import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
	return (
		<nav className="navbar sticky-top px-3" style={{backgroundColor:'#e9ecef'}}>
			<div className="container-fluid">
				<Link to="/" className="btn fw-bold fs-2">
					HOME
				</Link>
				<Link to="/create-post" className="btn btn-outline-primary">
					Create Post
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
