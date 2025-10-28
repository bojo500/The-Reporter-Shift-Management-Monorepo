import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, TextField } from '../components/ui'
import { authAPI } from '../utils/api'
import { showErrorToast, showSuccessToast } from '../utils/toast'
import Footer from '../components/Footer'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      showErrorToast('Please fill in all required fields')
      return false
    }

    if (formData.password.length < 6) {
      showErrorToast('Password must be at least 6 characters long')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      showErrorToast('Please enter a valid email address')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    try {
      await authAPI.register(formData)

      navigate('/verify-email-pending', { state: { email: formData.email } })
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.'
      showErrorToast(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <TextField
              label="Name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange('name')}
              fullWidth
              required
            />

            <TextField
              label="Email address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange('email')}
              fullWidth
              required
            />

            <TextField
              label="Password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange('password')}
              fullWidth
              required
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="confirm"
              size="large"
              fullWidth
              state={loading ? 'disable' : 'default'}
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </Button>
          </div>
        </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
