import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '../components/ui'
import { usersAPI } from '../utils/api'
import { showErrorToast, showSuccessToast } from '../utils/toast'

interface UserData {
  id: number
  email: string
  name: string
  phoneNumber?: string
  section?: string
  createdAt?: string
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
  })

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      const userStr = localStorage.getItem('user')
      if (!userStr) {
        navigate('/login')
        return
      }

      const user = JSON.parse(userStr)
      const response = await usersAPI.findOne(user.id)
      const userInfo = response.data.data

      setUserData(userInfo)
      setFormData({
        name: userInfo.name || '',
        phoneNumber: userInfo.phoneNumber || '',
      })
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to load user profile'
      showErrorToast(message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleSave = async () => {
    if (!userData) return

    if (!formData.name) {
      showErrorToast('Name is required')
      return
    }

    setSaving(true)
    try {
      const response = await usersAPI.update(userData.id, formData)
      const updatedUser = response.data.data

      setUserData(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))

      showSuccessToast('Profile updated successfully!')
      setIsEditing(false)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update profile'
      showErrorToast(message)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        phoneNumber: userData.phoneNumber || '',
      })
    }
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Unable to load profile</p>
          <Button variant="confirm" size="medium" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <Button
            variant="default"
            size="medium"
            onClick={() => navigate('/dashboard')}
          >
            ← Back to Dashboard
          </Button>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-blue-600 h-24"></div>
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="h-24 w-24 rounded-full bg-gray-300 -mt-16 border-4 border-white flex items-center justify-center text-3xl font-bold text-gray-700">
                  {userData.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {userData.name}
                  </h1>
                  <p className="text-gray-600">{userData.email}</p>
                  {userData.section && (
                    <p className="text-sm text-gray-500">Section: {userData.section}</p>
                  )}
                </div>
              </div>
              {!isEditing && (
                <Button variant="default" size="medium" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold mb-4">Profile Information</h2>

              <div className="space-y-4">
                <TextField
                  label="Name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  fullWidth
                  disabled={!isEditing}
                  required
                />

                <TextField
                  label="Email"
                  type="email"
                  value={userData.email}
                  fullWidth
                  disabled
                />

                <TextField
                  label="Phone Number"
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange('phoneNumber')}
                  fullWidth
                  disabled={!isEditing}
                />

                {userData.createdAt && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Member Since
                    </label>
                    <p className="text-gray-900">
                      {new Date(userData.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-3 mt-6">
                  <Button
                    variant="confirm"
                    size="medium"
                    onClick={handleSave}
                    state={saving ? 'disable' : 'default'}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>

                  <Button
                    variant="default"
                    size="medium"
                    onClick={handleCancel}
                    state={saving ? 'disable' : 'default'}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
