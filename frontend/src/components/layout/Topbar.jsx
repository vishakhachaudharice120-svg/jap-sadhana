import { Menu, LogOut, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../context/useAuth.js'

function Topbar({ onToggleSidebar }) {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const location = useLocation()
  const pageMeta = {
    '/chants': {
      title: 'Add Chant Count',
      description: 'Select a mantra, pick a date, and save your count for that day.',
    },
    '/analytics': {
      title: 'Analytics',
      description: 'Review totals, trends, and recent entries for each mantra.',
    },
    '/reports': {
      title: 'Reports',
      description: 'Download the chanting report for review and sharing.',
    },
  }
  const currentPage = pageMeta[location.pathname] || {
    title: 'Jap Sadhana',
    description: 'Track your chanting journey.',
  }
  const showAdminTag = location.pathname === '/reports' && user?.role === 'admin'

  useEffect(() => {
    function handlePointerDown(event) {
      if (!menuRef.current?.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-line bg-[rgba(252,250,246,0.92)] backdrop-blur-md lg:left-72">
      <div className="mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-gold/50 hover:text-gold lg:hidden"
          >
            <Menu size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-ink sm:text-[22px]">{currentPage.title}</h1>
              {showAdminTag ? (
                <span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 md:inline-flex">
                  Admin
                </span>
              ) : null}
            </div>
            <p className="hidden text-sm text-muted md:block">{currentPage.description}</p>
          </div>
        </div>

        <div ref={menuRef} className="relative z-40">
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="flex items-center gap-2 rounded-full border border-line bg-white px-2.5 py-1.5 text-left transition hover:border-gold/40"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Jap User')}&background=F4A261&color=0F0E17`}
              alt={user?.name || 'Profile'}
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-ink">{user?.name || 'Seeker'}</p>
            </div>
            <ChevronDown size={14} className={`text-muted transition ${menuOpen ? 'rotate-180' : ''}`} />
          </button>

          <div
            className={`absolute right-0 top-[calc(100%+10px)] w-36 rounded-2xl border border-line bg-white p-1.5 shadow-aura transition duration-200 ${
              menuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                logout()
              }}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-[#f7f2ea] hover:text-ink"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
