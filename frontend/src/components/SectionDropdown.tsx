import React from 'react'
import Select, { SelectOption } from './ui/Select'

interface SectionDropdownProps {
  value: string
  onChange: (value: string) => void
  label?: string
  className?: string
  fullWidth?: boolean
}

const SECTIONS: SelectOption[] = [
  { value: '', label: 'Select a section' },
  { value: 'production', label: 'Production' },
  { value: 'quality', label: 'Quality Control' },
  { value: 'CCS', label: 'CCS' },
  { value: 'CRM', label: 'CRM' },
  { value: 'BAF', label: 'BAF' },
]

export default function SectionDropdown({
  value,
  onChange,
  label = 'Section',
  className = '',
  fullWidth = false
}: SectionDropdownProps) {
  return (
    <Select
      label={label}
      options={SECTIONS}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      fullWidth={fullWidth}
    />
  )
}
