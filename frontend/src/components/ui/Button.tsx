import React, { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'default' | 'confirm' | 'with-icon' | 'dropdown'
export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonState = 'default' | 'hover' | 'disable' | 'disabled'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  state?: ButtonState
  children: React.ReactNode
  icon?: React.ReactNode
  fullWidth?: boolean
}

export default function Button({
  variant = 'default',
  size = 'medium',
  state = 'default',
  children,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || state === 'disabled' || state === 'disable'

  const baseClasses = 'font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400'

  const sizeClasses = {
    small: 'px-4 py-1.5 text-sm',
    medium: 'px-5 py-2 text-sm',
    large: 'px-6 py-2.5 text-base',
  }

  const variantClasses = {
    default: isDisabled
      ? 'bg-blue-200 text-white cursor-not-allowed'
      : state === 'hover'
      ? 'bg-blue-600 text-white'
      : 'bg-blue-500 text-white hover:bg-blue-600',
    confirm: isDisabled
      ? 'bg-blue-200 text-white cursor-not-allowed'
      : state === 'hover'
      ? 'bg-blue-600 text-white'
      : 'bg-blue-500 text-white hover:bg-blue-600',
    'with-icon': isDisabled
      ? 'bg-blue-200 text-white cursor-not-allowed'
      : state === 'hover'
      ? 'bg-blue-600 text-white'
      : 'bg-blue-500 text-white hover:bg-blue-600',
    dropdown: isDisabled
      ? 'bg-blue-200 text-white cursor-not-allowed'
      : state === 'hover'
      ? 'bg-blue-600 text-white'
      : 'bg-blue-500 text-white hover:bg-blue-600',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className} flex items-center justify-center gap-2`}
      disabled={isDisabled}
      {...props}
    >
      {icon && <span className="inline-flex items-center">{icon}</span>}
      {children}
      {variant === 'dropdown' && (
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}
