import React, { InputHTMLAttributes, forwardRef } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  fullWidth?: boolean
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, helperText, leftIcon, fullWidth = false, className = '', ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : ''

    return (
      <div className={`flex flex-col ${widthClass}`}>
        {label && (
          <label className="text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              px-3 py-2 border rounded
              ${leftIcon ? 'pl-10' : ''}
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${props.disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-white'}
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
              transition-colors duration-200
              ${widthClass}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        {helperText && !error && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      </div>
    )
  }
)

TextField.displayName = 'TextField'

export default TextField
