import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/useAuth.js'
import ProtectedRoute from './components/layout/ProtectedRoute.jsx'
import Topbar from './components/layout/Topbar.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import Login from './pages/Login.jsx'
import AddChant from './pages/AddChant.jsx'
import Analytics from './pages/Analytics.jsx'
import AdminReport from './pages/AdminReport.jsx'
import NotFound from './pages/NotFound.jsx'
import ErrorBoundary from './pages/ErrorBoundary.jsx'

function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-mist text-ink">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.55),_transparent_18%),radial-gradient(circle_at_top_left,_rgba(199,138,59,0.07),_transparent_24%)]" />
      <div className="relative flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-h-screen flex-1 flex-col lg:pl-72">
          <Topbar onToggleSidebar={() => setSidebarOpen((current) => !current)} />
          <main className="flex-1 px-4 pb-8 pt-24 sm:px-6 lg:px-10">
            <Routes>
              <Route index element={<Navigate to="/chants" replace />} />
              <Route path="/chants" element={<AddChant />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/reports" element={<AdminReport />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/chants" replace /> : <Login />} />
        <Route
          path="/*"
          element={(
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
