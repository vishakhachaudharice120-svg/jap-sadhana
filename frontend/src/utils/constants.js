export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const MANTRAS = [
  { id: 'gayatri_mantra', label: 'Gayatri Mantra', color: '#F59E0B', icon: 'Sun', accent: 'from-amber-400/30 to-amber-600/10' },
  { id: 'mahamrityunjay_mantra', label: 'Mahamrityunjay Mantra', color: '#EF4444', icon: 'Flame', accent: 'from-rose-400/30 to-red-700/10' },
  { id: 'shree_swami_samarth_mantra', label: 'Shree Swami Samarth Mantra', color: '#8B5CF6', icon: 'Sparkles', accent: 'from-violet-400/30 to-fuchsia-700/10' },
  { id: 'navarnav_mantra', label: 'Navarnav Mantra', color: '#0EA5E9', icon: 'Sparkles', accent: 'from-sky-400/30 to-cyan-700/10' },
  { id: 'shree_swami_charitra_saramrut', label: 'Shree Swami Charitra Saramrut', color: '#14B8A6', icon: 'Flower2', accent: 'from-teal-400/30 to-emerald-700/10' },
  { id: 'durga_saptshati_path', label: 'Durga Saptshati Path', color: '#F97316', icon: 'Flame', accent: 'from-orange-400/30 to-amber-700/10' },
  { id: 'malhari_saptshati_path', label: 'Malhari Saptshati Path', color: '#22C55E', icon: 'Flower2', accent: 'from-lime-400/30 to-green-700/10' },
]

export const NAV_ITEMS = [
  { to: '/chants', label: 'Add Chant Count', icon: 'NotebookPen' },
  { to: '/analytics', label: 'Analytics', icon: 'ChartColumnBig' },
  { to: '/reports', label: 'Report', icon: 'FileSpreadsheet', adminOnly: true },
]

export const TOKEN_KEY = 'jap_sadhana_token'
export const USER_KEY = 'jap_sadhana_user'
