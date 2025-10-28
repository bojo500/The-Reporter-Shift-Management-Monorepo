import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, TextField } from '../components/ui'
import { showErrorToast, showSuccessToast } from '../utils/toast'
import { ccsAPI, shiftsAPI } from '../utils/api'

export default function CCSReport() {
  const location = useLocation()
  const navigate = useNavigate()
  const { userId, section, shift } = location.state || {}

  // Redirect back if no required data
  if (!userId || !section || !shift) {
    navigate('/dashboard')
    return null
  }

  const [formData, setFormData] = useState({
    baf_in: '',
    baf_out: '',
    crm_in: '',
    crm_out: '',
    shipped_out: '',
    tugger_in: '',
    tugger_off: '',
    totalTrucksIn: '',
    totalTrucksOut: '',
    totalMovements: '',
    totalTrucks: '',
    hook: '',
    downTime: '',
    movedOfShipping: '',
    slitter_on: '',
    slitter_off: '',
    coils_hatted: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields are filled
    const emptyFields = Object.entries(formData).filter(([_, value]) => value === '')
    if (emptyFields.length > 0) {
      showErrorToast('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      // Step 1: Create shift entity first
      const shiftData = {
        shift: shift,
        section: section,
        userId: userId
      }

      const shiftResponse = await shiftsAPI.create(shiftData)
      const createdShift = shiftResponse.data

      // Step 2: Create CCS report with the created shift ID
      const payload = {
        shiftId: createdShift.id,
        section,
        userId: userId,
        ...Object.fromEntries(
          Object.entries(formData).map(([key, value]) => [key, Number(value)])
        ),
      }

      // Call API to submit CCS data
      await ccsAPI.create(payload)

      showSuccessToast('CCS report submitted successfully!')
      navigate('/dashboard')
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to submit report. Please try again.'
      showErrorToast(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded shadow">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">CCS Report</h2>
            <p className="text-sm text-gray-600 mt-2">
              Shift: <span className="font-medium">{shift}</span> | Section: <span className="font-medium">{section}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="BAF In"
                type="number"
                placeholder="Enter BAF In"
                value={formData.baf_in}
                onChange={handleChange('baf_in')}
                fullWidth
                required
              />

              <TextField
                label="BAF Out"
                type="number"
                placeholder="Enter BAF Out"
                value={formData.baf_out}
                onChange={handleChange('baf_out')}
                fullWidth
                required
              />

              <TextField
                label="CRM In"
                type="number"
                placeholder="Enter CRM In"
                value={formData.crm_in}
                onChange={handleChange('crm_in')}
                fullWidth
                required
              />

              <TextField
                label="CRM Out"
                type="number"
                placeholder="Enter CRM Out"
                value={formData.crm_out}
                onChange={handleChange('crm_out')}
                fullWidth
                required
              />

              <TextField
                label="Shipped Out"
                type="number"
                placeholder="Enter Shipped Out"
                value={formData.shipped_out}
                onChange={handleChange('shipped_out')}
                fullWidth
                required
              />

              <TextField
                label="Tugger In"
                type="number"
                placeholder="Enter Tugger In"
                value={formData.tugger_in}
                onChange={handleChange('tugger_in')}
                fullWidth
                required
              />

              <TextField
                label="Tugger Off"
                type="number"
                placeholder="Enter Tugger Off"
                value={formData.tugger_off}
                onChange={handleChange('tugger_off')}
                fullWidth
                required
              />

              <TextField
                label="Total Trucks In"
                type="number"
                placeholder="Enter Total Trucks In"
                value={formData.totalTrucksIn}
                onChange={handleChange('totalTrucksIn')}
                fullWidth
                required
              />

              <TextField
                label="Total Trucks Out"
                type="number"
                placeholder="Enter Total Trucks Out"
                value={formData.totalTrucksOut}
                onChange={handleChange('totalTrucksOut')}
                fullWidth
                required
              />

              <TextField
                label="Total Movements"
                type="number"
                placeholder="Enter Total Movements"
                value={formData.totalMovements}
                onChange={handleChange('totalMovements')}
                fullWidth
                required
              />

              <TextField
                label="Total Trucks"
                type="number"
                placeholder="Enter Total Trucks"
                value={formData.totalTrucks}
                onChange={handleChange('totalTrucks')}
                fullWidth
                required
              />

              <TextField
                label="Hook"
                type="number"
                placeholder="Enter Hook"
                value={formData.hook}
                onChange={handleChange('hook')}
                fullWidth
                required
              />

              <TextField
                label="Down Time"
                type="number"
                placeholder="Enter Down Time"
                value={formData.downTime}
                onChange={handleChange('downTime')}
                fullWidth
                required
              />

              <TextField
                label="Moved Of Shipping"
                type="number"
                placeholder="Enter Moved Of Shipping"
                value={formData.movedOfShipping}
                onChange={handleChange('movedOfShipping')}
                fullWidth
                required
              />

              <TextField
                label="Slitter On"
                type="number"
                placeholder="Enter Slitter On"
                value={formData.slitter_on}
                onChange={handleChange('slitter_on')}
                fullWidth
                required
              />

              <TextField
                label="Slitter Off"
                type="number"
                placeholder="Enter Slitter Off"
                value={formData.slitter_off}
                onChange={handleChange('slitter_off')}
                fullWidth
                required
              />

              <TextField
                label="Coils Hatted"
                type="number"
                placeholder="Enter Coils Hatted"
                value={formData.coils_hatted}
                onChange={handleChange('coils_hatted')}
                fullWidth
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                variant="confirm"
                size="large"
                state={loading ? 'disable' : 'default'}
              >
                {loading ? 'Submitting...' : 'Submit Report'}
              </Button>

              <Button
                type="button"
                variant="default"
                size="large"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
