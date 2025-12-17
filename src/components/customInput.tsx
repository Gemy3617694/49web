import React from "react";

interface CustomInputProps {
  icon?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: () => void;
  error?: string;
  // React Hook Form props
  name?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ icon, placeholder, type = "text", value, onChange, onIconClick, error, ...rest }, ref) => {
    const dirInLocal = localStorage.getItem('dir');

    return (
      <div className="w-full">
        <div
          dir={dirInLocal || 'ltr'}
          className={`flex items-center w-full border rounded-2xl px-2 py-2 bg-white hover:border-main focus-within:border-main transition ${
            error ? 'border-red-500' : 'border-gray-400'
          }`}
        >
          {icon && (
            <img 
              src={icon} 
              alt="icon" 
              className="w-5 h-5 cursor-pointer" 
              onClick={onIconClick}
            />
          )}
          <input
            ref={ref}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="flex-1 px-2 text-lg bg-transparent outline-none text-gray-700 placeholder-gray-500"
            {...rest}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-1 px-2">{error}</p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;