import React from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer'

export default function VerifyEmailPending() {
  const location = useLocation()
  const email = location.state?.email || 'your email'

  const handleResendEmail = () => {
    // TODO: Implement resend email functionality
    console.log('Resending verification email...')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-blue-100 rounded-full flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Verify your email
        </h2>

        <p className="text-gray-600 mb-2">
          We've sent an email to <span className="font-medium text-gray-900">{email}</span> to verify your email
        </p>
        <p className="text-gray-600 mb-8">
          address and activate your account. The link in the email will expire in 24 hours.
        </p>

        <button
          onClick={handleResendEmail}
          className="text-blue-600 hover:text-blue-500 font-medium"
        >
          Click here
        </button>
        <span className="text-gray-600">
          {' '}if you did not receive an email or would like to change the email address you signed up with.
        </span>
        </div>
      </div>
      <Footer />
    </div>
  )
}
