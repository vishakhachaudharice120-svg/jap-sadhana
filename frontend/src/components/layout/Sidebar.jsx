import { ChartColumnBig, FileSpreadsheet, NotebookPen, Sparkles, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/useAuth.js'

const iconMap = {
  NotebookPen,
  ChartColumnBig,
  FileSpreadsheet,
}

const items = [
  { to: '/chants', label: 'Add Chant Count', icon: 'NotebookPen' },
  { to: '/analytics', label: 'Analytics', icon: 'ChartColumnBig' },
  { to: '/reports', label: 'Report', icon: 'FileSpreadsheet', adminOnly: true },
]

function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth()

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-900/20 transition lg:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[86vw] max-w-72 border-r border-line bg-[#fcfaf6] px-5 py-6 shadow-aura transition duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="mb-8 flex items-start justify-between lg:hidden">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2e5d0] text-xl text-gold">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="soft-label">Mantra tracker</p>
              <h2 className="text-2xl text-ink">Jap Sadhana</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mb-10 hidden items-start justify-between lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2e5d0] text-xl text-gold">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="soft-label">Mantra tracker</p>
              <h2 className="text-2xl text-ink">Jap Sadhana</h2>
            </div>
          </div>
        </div>

        <div className="mb-8 hidden rounded-[28px] border border-line bg-white p-5 lg:block">
          <p className="soft-label">Current focus</p>
          <p className="mt-3 text-lg font-semibold text-ink">Keep your mantra rhythm visible, calm, and consistent.</p>
          <p className="mt-2 text-sm text-muted">Track counts, review patterns, and keep daily practice organized in one place.</p>
        </div>

        <nav className="space-y-2">
          {items
            .filter((item) => !item.adminOnly || user?.role === 'admin')
            .map((item) => {
              const Icon = iconMap[item.icon]
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                      isActive
                        ? 'border-gold/30 bg-[#f6efe4] text-ink'
                        : 'border-transparent bg-transparent text-muted hover:border-line hover:bg-white hover:text-ink'
                    }`
                  }
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f7f2ea]">
                    <Icon size={18} />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold">{item.label}</p>
                  </div>
                </NavLink>
              )
            })}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
