import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { fetchCurrentUser, login as loginRequest, register as registerRequest } from '../services/auth.service'
import { TOKEN_KEY, USER_KEY } from '../utils/constants'
import { AuthContext } from './auth-context.js'

function persistAuth(token, user) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

function clearPersistedAuth() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const storedToken = localStorage.getItem(TOKEN_KEY)
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY)
    if (stored) {
      return JSON.parse(stored)
    }

    return null
  })
  const [isBootstrapping, setIsBootstrapping] = useState(Boolean(storedToken))

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const oauthToken = params.get('token')
    const oauthError = params.get('error')

    if (oauthError) {
      toast.error('Google sign-in was not completed.')
      navigate('/login', { replace: true })
      return
    }

    if (!oauthToken) {
      return
    }

    localStorage.setItem(TOKEN_KEY, oauthToken)
    fetchCurrentUser()
      .then((response) => {
        const currentUser = response?.data?.user
        if (currentUser) {
          setUser(currentUser)
          localStorage.setItem(USER_KEY, JSON.stringify(currentUser))
          toast.success('Signed in with Google.')
          navigate('/chants', { replace: true })
        }
      })
      .catch(() => {
        clearPersistedAuth()
        toast.error('Unable to finish Google sign-in.')
        navigate('/login', { replace: true })
      })
  }, [location.search, navigate])

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      return
    }

    fetchCurrentUser()
      .then((response) => {
        const currentUser = response?.data?.user
        setUser(currentUser)
        localStorage.setItem(USER_KEY, JSON.stringify(currentUser))
      })
      .catch(() => {
        clearPersistedAuth()
        setUser(null)
      })
      .finally(() => setIsBootstrapping(false))
  }, [])

  async function login(credentials) {
    const response = await loginRequest(credentials)
    const token = response?.data?.token
    const currentUser = response?.data?.user
    persistAuth(token, currentUser)
    setUser(currentUser)
    return currentUser
  }

  async function register(payload) {
    const response = await registerRequest(payload)
    const token = response?.data?.token
    const currentUser = response?.data?.user
    persistAuth(token, currentUser)
    setUser(currentUser)
    return currentUser
  }

  function logout() {
    clearPersistedAuth()
    setUser(null)
    navigate('/login', { replace: true })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isBootstrapping,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
