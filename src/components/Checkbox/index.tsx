import React from 'react';

interface CheckboxGroupProps {
  checkboxes: { name: string; value: boolean }[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>, group: string) => void;
  groupName: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ checkboxes, onChange, groupName }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-5">
      {checkboxes.map(({ name, value }, index) => (
        <label
          key={index}
          className={`flex items-center justify-between p-4 mb-3 cursor-pointer text-lg select-none bg-white border border-gray-300 shadow-sm rounded-lg h-[50px] transition-transform transform hover:scale-105 ${
            value ? 'bg-[#751A9B] border-[#751A9B]' : ''
          }`}
        >
          <span className="text-sm font-medium text-gray-800">
            {name}
          </span>
          <span
            className={`flex items-center justify-center w-6 h-6 border border-gray-300 rounded-sm ${
              value ? 'bg-[#751A9B]' : 'bg-white'
            }`}
          >
            {value && (
              <svg
                className={`w-4 h-4 ${value ? 'text-white' : 'text-purple-900'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
          <input
            type="checkbox"
            name={name}
            checked={value}
            onChange={(event) => onChange(event, groupName)}
            className="absolute opacity-0 cursor-pointer h-0 w-0"
          />
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
