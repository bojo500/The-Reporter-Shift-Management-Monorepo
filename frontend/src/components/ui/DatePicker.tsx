import React, { InputHTMLAttributes, forwardRef } from 'react'

interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, helperText, fullWidth = false, className = '', ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : ''

    return (
      <div className={`flex flex-col ${widthClass}`}>
        {label && (
          <label className="text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type="date"
            className={`
              px-3 py-2 border rounded
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${props.disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-white'}
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
              transition-colors duration-200
              ${widthClass}
              ${className}
            `}
            {...props}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 6H14" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M5 1V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M11 1V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        {helperText && !error && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'

export default DatePicker
