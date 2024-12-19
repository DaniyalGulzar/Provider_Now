import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean; 
}

const   Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
  icon,
  disabled = false, 
}) => {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick} 
      className={`flex items-center justify-center ${className} ${disabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : ''}`}
      disabled={disabled} 
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
