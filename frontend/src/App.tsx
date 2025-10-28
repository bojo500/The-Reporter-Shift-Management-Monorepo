import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import UserDashboard from './pages/UserDashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyEmail from './pages/VerifyEmail'
import VerifyEmailPending from './pages/VerifyEmailPending'
import CCSReport from './pages/CCSReport'
import UserProfile from './pages/UserProfile'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'
import Logo from './components/Logo'
import { Button } from './components/ui'

function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-[#3B5BA9] shadow-lg">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <Logo size="medium" showText={true} />

          {token ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="text-white hover:text-gray-200 transition">
                {user?.name || 'Profile'}
              </Link>
              <Button variant="default" size="small" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-white hover:text-gray-200 transition">
                Login
              </Link>
              <Link to="/register">
                <Button variant="confirm" size="small">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify-email-pending" element={<VerifyEmailPending />} />

      <Route path="/" element={
        <Layout>
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        </Layout>
      } />

      <Route path="/dashboard" element={
        <Layout>
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        </Layout>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      } />

      <Route path="/ccs-report" element={
        <Layout>
          <ProtectedRoute>
            <CCSReport />
          </ProtectedRoute>
        </Layout>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
