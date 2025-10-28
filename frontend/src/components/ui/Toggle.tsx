import React, { InputHTMLAttributes, forwardRef } from 'react'

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  activeLabel?: string
  inactiveLabel?: string
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, activeLabel = 'active', inactiveLabel = 'inactive', className = '', checked, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
        <label className="flex items-center cursor-pointer">
          <span className="text-sm text-gray-700 mr-3">{checked ? activeLabel : inactiveLabel}</span>
          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              className="sr-only peer"
              checked={checked}
              {...props}
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 peer-disabled:bg-gray-200 peer-disabled:cursor-not-allowed transition-colors duration-200"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
          </div>
        </label>
      </div>
    )
  }
)

Toggle.displayName = 'Toggle'

export default Toggle
