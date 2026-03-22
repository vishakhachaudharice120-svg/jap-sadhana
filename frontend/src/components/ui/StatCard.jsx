import { Flame, Flower2, Sparkles, Sun } from 'lucide-react'
import { formatCount } from '../../utils/formatters'

const iconMap = {
  Sun,
  Flame,
  Sparkles,
  Flower2,
}

function StatCard({ mantra, value, helper }) {
  const Icon = iconMap[mantra.icon]

  return (
    <article className="glass-panel relative overflow-hidden p-4">
      <div className={`absolute inset-0 bg-gradient-to-br ${mantra.accent} opacity-16`} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="soft-label">All-time total</p>
            <h3 className="mt-1 text-sm text-ink">{mantra.label}</h3>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#efe7db] bg-white" style={{ color: mantra.color }}>
            <Icon size={18} />
          </div>
        </div>
        <p className="mt-4 text-2xl font-semibold text-ink">{formatCount(value)}</p>
        <p className="mt-1.5 text-xs text-muted">{helper}</p>
      </div>
    </article>
  )
}

export default StatCard
