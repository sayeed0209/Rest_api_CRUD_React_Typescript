import React from 'react';
import { ButtonProps } from '../../interfaces';
const Button: React.FC<ButtonProps> = ({ className, children, onClick }) => {
	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
