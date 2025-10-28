import React from 'react'
import { Link } from 'react-router-dom'

interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  showText?: boolean
  className?: string
}

export default function Logo({ size = 'medium', showText = true, className = '' }: LogoProps) {
  const sizes = {
    small: { icon: 'w-8 h-8', text: 'text-lg' },
    medium: { icon: 'w-10 h-10', text: 'text-xl' },
    large: { icon: 'w-16 h-16', text: 'text-3xl' }
  }

  const sizeClasses = sizes[size]

  return (
    <Link to="/" className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon with white circle background */}
      <div className={`${sizeClasses.icon} rounded-full bg-white flex items-center justify-center p-2`}>
        <svg
          viewBox="0 0 100 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#3B5BA9]"
        >
          {/* Desktop/Monitor */}
          <rect x="10" y="15" width="50" height="35" rx="2" stroke="currentColor" strokeWidth="3" fill="none"/>
          <rect x="16" y="20" width="20" height="12" stroke="currentColor" strokeWidth="2" fill="none"/>
          <line x1="16" y1="35" x2="32" y2="35" stroke="currentColor" strokeWidth="2"/>
          <line x1="16" y1="39" x2="52" y2="39" stroke="currentColor" strokeWidth="2"/>
          <circle cx="14" cy="18" r="1" fill="currentColor"/>
          <line x1="25" y1="52" x2="45" y2="52" stroke="currentColor" strokeWidth="3"/>
          
          {/* Mobile Phone */}
          <rect x="60" y="25" width="18" height="30" rx="2" stroke="currentColor" strokeWidth="3" fill="none"/>
          <line x1="63" y1="45" x2="75" y2="45" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="63" y1="48" x2="75" y2="48" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="67" y1="51" x2="71" y2="51" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <span className={`font-bold ${sizeClasses.text} text-white tracking-wide`}>
          Reporter
        </span>
      )}
    </Link>
  )
}
