"use client"
import Image from "next/image";
import React, { ChangeEvent, CSSProperties, FC, useState } from "react";

interface InputFieldProps {
  type?:
  | "text"
  | "textarea"
  | "number"
  | "password"
  | "email"
  | "checkbox"
  | "state"
  | "date";
  id?: string;
  name?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  maxLength?: number;
  style?: CSSProperties;
  className?: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  label?: string;
  labelClassName?: string;
  disabled?: boolean;
}

const InputField: FC<InputFieldProps> = ({
  type = "text",
  id,
  name,
  value,
  onChange,
  onKeyDown,
  maxLength = 100,
  style = {},
  className = "w-full h-[48px] p-2 mt-3",
  rows = 4,
  placeholder = "",
  required = false,
  label,
  labelClassName = "text-xl font-semibold",
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-3 relative">
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
          {required && <span className="text-red-500">&nbsp;*</span>}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
          className={className}
          rows={rows}
          placeholder={placeholder}
          style={style}
          required={required}
          disabled={disabled}
        />
      ) : (
        <div className="relative">
          <input
            type={showPassword ? "text" : type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            className={className}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            style={{
              textAlign: "left",
              border: "1px solid #ccc",
              borderRadius: "8px",
              paddingLeft: "10px",
              ...style,
            }}
          />
          {type === "password" && (
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={handleTogglePassword}
            >
              <Image
                src={
                  showPassword ? "/myImages/eye.svg" : "/myImages/eye-hide.svg"
                }
                alt={showPassword ? "Hide Password" : "Show Password"}
                width={24}
                height={24}
                className="h-6 w-6 mt-3"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;
