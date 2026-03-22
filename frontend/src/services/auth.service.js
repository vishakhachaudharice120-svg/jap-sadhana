import api from './api'
import { API_BASE_URL } from '../utils/constants'

export async function login(payload) {
  const { data } = await api.post('/auth/login', payload)
  return data
}

export async function register(payload) {
  const { data } = await api.post('/auth/register', payload)
  return data
}

export async function fetchCurrentUser() {
  const { data } = await api.get('/auth/me')
  return data
}

export function getGoogleAuthUrl() {
  return `${API_BASE_URL}/api/auth/google`
}

