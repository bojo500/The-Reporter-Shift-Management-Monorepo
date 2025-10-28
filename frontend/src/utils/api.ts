import axios, { AxiosError } from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (userData: {
    name: string
    email: string
    password: string
  }) => api.post('/auth/register', userData),
  verifyEmail: (token: string) =>
    api.get(`/auth/verify-email?token=${token}`),
}

// Users API
export const usersAPI = {
  create: (userData: any) => api.post('/users', userData),
  findAll: () => api.get('/users'),
  findOne: (id: number) => api.get(`/users/${id}`),
  update: (id: number, userData: any) => api.patch(`/users/${id}`, userData),
  remove: (id: number) => api.delete(`/users/${id}`),
}

// Reports API
export const reportsAPI = {
  create: (shiftId: number, reportData: any) =>
    api.post(`/reports/${shiftId}`, reportData),
  findByShift: (shiftId: number) => api.get(`/reports/${shiftId}`),
}

// Shifts API
export const shiftsAPI = {
  create: (shiftData: any) => api.post('/shifts', shiftData),
  findAll: () => api.get('/shifts'),
}

// CCS API
export const ccsAPI = {
  create: (ccsData: any) => api.post('/ccs', ccsData),
  findOne: (id: number) => api.get(`/ccs/${id}`),
  findAll: () => api.get('/ccs'),
}

// Mail API
export const mailAPI = {
  send: (to: string, subject: string, html: string) =>
    api.post('/mail/send', { to, subject, html }),
}

export default api
