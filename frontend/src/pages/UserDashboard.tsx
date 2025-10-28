import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ShiftDropdown from '../components/ShiftDropdown'
import SectionDropdown from '../components/SectionDropdown'
import { Button, TextField, DatePicker, Checkbox, Toggle } from '../components/ui'
import { showErrorToast } from '../utils/toast'

export default function UserDashboard(){
  const navigate = useNavigate()
  const [selectedShift, setSelectedShift] = useState('')
  const [selectedSection, setSelectedSection] = useState('')
  const [reportTitle, setReportTitle] = useState('')
  const [reportDate, setReportDate] = useState('')
  const [isUrgent, setIsUrgent] = useState(false)
  const [isActive, setIsActive] = useState(true)

  const handleSubmit = () => {
    // Validate shift and section are selected
    if (!selectedShift || !selectedSection) {
      showErrorToast('Please select both shift and section')
      return
    }

    // Get user info from localStorage
    const userStr = localStorage.getItem('user')
    const user = userStr ? JSON.parse(userStr) : null

    if (!user?.id) {
      showErrorToast('User not found. Please login again.')
      return
    }

    // If section is CCS, navigate to CCS report page WITHOUT creating shift
    if (selectedSection === 'CCS') {
      navigate('/ccs-report', {
        state: {
          userId: user.id,
          section: selectedSection,
          shift: selectedShift
        }
      })
    } else {
      // For other sections, handle accordingly
      console.log({
        shift: selectedShift,
        section: selectedSection,
        title: reportTitle,
        date: reportDate,
        urgent: isUrgent,
        active: isActive
      })
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">User Dashboard</h2>
      <p className="text-gray-600 mb-6">Create and view your shift reports here.</p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ShiftDropdown
            value={selectedShift}
            onChange={setSelectedShift}
            fullWidth
          />
          <SectionDropdown
            value={selectedSection}
            onChange={setSelectedSection}
            fullWidth
          />
        </div>

        <TextField
          label="Report Title"
          placeholder="Enter report title"
          value={reportTitle}
          onChange={(e) => setReportTitle(e.target.value)}
          fullWidth
        />

        <DatePicker
          label="Report Date"
          value={reportDate}
          onChange={(e) => setReportDate(e.target.value)}
          fullWidth
        />

        <div className="flex items-center gap-6">
          <Checkbox
            label="Mark as urgent"
            checked={isUrgent}
            onChange={(e) => setIsUrgent(e.target.checked)}
          />

          <Toggle
            activeLabel="Active"
            inactiveLabel="Inactive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="confirm"
            size="medium"
            onClick={handleSubmit}
          >
            Continue
          </Button>

          <Button
            variant="default"
            size="medium"
            state="disable"
          >
            Cancel
          </Button>
        </div>
      </div>

      {selectedShift && selectedSection && (
        <div className="mt-6 p-4 bg-blue-50 rounded">
          <p className="text-sm text-gray-700">
            Selected: <span className="font-medium">{selectedShift}</span> shift in{' '}
            <span className="font-medium">{selectedSection}</span> section
          </p>
        </div>
      )}
    </div>
  )
}
