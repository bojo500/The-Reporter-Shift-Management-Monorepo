import React, { SelectHTMLAttributes, forwardRef } from 'react'

export interface SelectOption {
  value: string
  label: string
  icon?: React.ReactNode
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[]
  error?: string
  helperText?: string
  fullWidth?: boolean
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, fullWidth = false, className = '', ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : ''

    return (
      <div className={`flex flex-col ${widthClass}`}>
        {label && (
          <label className="text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`
              px-3 py-2 pr-10 border rounded appearance-none
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${props.disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-white'}
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
              transition-colors duration-200
              ${widthClass}
              ${className}
            `}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        {helperText && !error && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
