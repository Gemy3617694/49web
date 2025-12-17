import React, { useState } from 'react';

interface CustomCheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  // React Hook Form props
  name?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
}

const CustomCheckbox = React.forwardRef<HTMLInputElement, CustomCheckboxProps>(
  ({ label, checked = false, onChange, disabled = false, error, ...rest }, ref) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = () => {
      if (disabled) return;
      
      const newValue = !isChecked;
      setIsChecked(newValue);
      onChange?.(newValue);
    };

    return (
      <div className="w-full">
        <div className="flex items-center space-x-3">
          <div
            className={`relative w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
              isChecked
                ? 'bg-main border-main'
                : 'bg-white border-gray-300'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-main'} ${
              error ? 'border-red-500' : ''
            }`}
            onClick={handleChange}
          >
            {isChecked && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            <input
              type="checkbox"
              ref={ref}
              checked={isChecked}
              onChange={handleChange}
              className="absolute opacity-0 w-0 h-0"
              {...rest}
            />
          </div>
          <span
            className={`px-1 text-sm font-medium ${
              disabled ? 'text-gray-400' : 'text-gray-700'
            } cursor-pointer select-none`}
            onClick={handleChange}
          >
            {label}
          </span>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

CustomCheckbox.displayName = "CustomCheckbox";

export default CustomCheckbox;