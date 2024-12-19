import { FaPager } from "react-icons/fa";
import React from "react";

interface CardProps {
	text: string;
	showIcon?: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	name?: string;
	checked?: boolean;
}

const Card: React.FC<CardProps> = ({
	text,
	showIcon = true,
	onChange,
	name,
	checked = false,
}) => (
	<div className="relative bg-white border rounded-lg shadow p-4 flex items-center justify-between space-x-4">
		<div className="flex items-center space-x-2">
			{showIcon && <FaPager size={20} />}
			<span className="text-base">{text}</span>
		</div>
		<div className="flex items-center">
			<input
				type="radio"
				name={name}
				value={text}
				checked={checked}
				onChange={(event) => onChange(event)}
				className="mr-2"
			/>
		</div>
	</div>
);

export default Card;
