import React from 'react'
import Select, { SelectOption } from './ui/Select'

interface ShiftDropdownProps {
  value: string
  onChange: (value: string) => void
  label?: string
  className?: string
  fullWidth?: boolean
}

const SHIFTS: SelectOption[] = [
  { value: '', label: 'Select a shift' },
  { value: '1st', label: '1st Shift' },
  { value: '2nd', label: '2nd Shift' },
  { value: '3rd', label: '3rd Shift' },
]

export default function ShiftDropdown({
  value,
  onChange,
  label = 'Shift',
  className = '',
  fullWidth = false
}: ShiftDropdownProps) {
  return (
    <Select
      label={label}
      options={SHIFTS}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      fullWidth={fullWidth}
    />
  )
}
