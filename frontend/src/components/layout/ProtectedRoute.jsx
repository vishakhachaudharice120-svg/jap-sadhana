import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/useAuth.js'
import Loader from '../ui/Loader.jsx'

function ProtectedRoute({ children }) {
  const location = useLocation()
  const { isAuthenticated, isBootstrapping } = useAuth()

  if (isBootstrapping) {
    return <Loader label="Preparing your sadhana space..." fullScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}

export default ProtectedRoute
