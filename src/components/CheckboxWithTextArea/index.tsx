import React from 'react';

interface CheckboxWithTextAreaGroupProps {
	checkboxes: { name: string; label: string; text: string; value: boolean }[];
	onChange: (event: React.ChangeEvent<HTMLInputElement>, group: string) => void;
	onChangeText: (event: React.ChangeEvent<HTMLInputElement>, group: string) => void;
	groupName: string;
}

const CheckboxWithTextAreaGroup: React.FC<CheckboxWithTextAreaGroupProps> = ({ checkboxes, onChange, onChangeText, groupName }) => {
	return (
		<>
			{checkboxes.map(({ name, label, text, value }, index) => (
				<div key={index}>
					<label className="flex items-center space-x-2">
						<input
							type="checkbox"
							name={label}
							checked={value}
							onChange={(event) => onChange(event, groupName)}
							className="form-radio text-red-600"
						/>
						<span className="text-gray-700">{name}</span>
					</label>
					{value ?
						<textarea
							id="message"
							rows={4}
							name={label}
							maxLength={200}
							onChange={(event: any) => onChangeText(event, groupName)}
							className="block p-2.5 w-full text-sm text-black bg-gray rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Describe product or service (provide as much detail as possible)"
						></textarea> : null
					}
				</div>
			))}
		</>
	);
};

export default CheckboxWithTextAreaGroup;
