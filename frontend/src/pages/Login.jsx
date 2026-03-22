import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShieldCheck, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/useAuth.js'
import { getGoogleAuthUrl } from '../services/auth.service'
import Loader from '../components/ui/Loader.jsx'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, register } = useAuth()
  const [mode, setMode] = useState('login')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  async function handleSubmit(event) {
    event.preventDefault()

    const email = formData.email.trim()
    const name = formData.name.trim()

    if (!email || !formData.password || (mode === 'register' && !name)) {
      toast.error('Please fill in the required fields.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address.')
      return
    }

    if (mode === 'register' && name.length < 2) {
      toast.error('Name must be at least 2 characters long.')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long.')
      return
    }

    try {
      setIsSubmitting(true)
      if (mode === 'login') {
        await login({ email, password: formData.password })
        toast.success('Welcome back.')
      } else {
        await register({ ...formData, name, email })
        toast.success('Account created successfully.')
      }

      navigate(location.state?.from || '/chants', { replace: true })
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to continue.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-mist">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(199,138,59,0.08),_transparent_26%),linear-gradient(180deg,_rgba(255,255,255,0.55),_transparent_22%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:gap-14 lg:px-10">
        {/* <div className="mb-10 max-w-xl animate-rise lg:mb-0">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#eadcc5] bg-[#faf4e9] px-4 py-2 text-sm text-gold">
            <ShieldCheck size={16} />
            Calm, clear, professional tracking
          </div>
          <h1 className="mt-6 max-w-lg text-5xl leading-tight text-ink sm:text-6xl">
            Keep your daily mantra practice organized and easy to review.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Log jap counts, review progress, and export reports from a clean workspace designed for regular use.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              'Four dedicated mantra streams',
              'Daily totals and monthly analytics',
              'Admin reports ready for export',
            ].map((item) => (
              <div key={item} className="rounded-[24px] border border-line bg-white p-4 text-sm text-muted shadow-aura">
                {item}
              </div>
            ))}
          </div>
        </div> */}

        <div className="glass-panel relative w-full max-w-xl overflow-hidden p-6 sm:p-8">
          {isSubmitting ? <Loader label="Signing you in..." overlay /> : null}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f2e5d0] text-gold">
              <Sparkles size={22} />
            </div>
            <div>
              <p className="soft-label">Welcome</p>
              <h2 className="mt-2 text-3xl text-ink">Jap Sadhana</h2>
            </div>
          </div>

          <div className="mb-6 flex rounded-full border border-line bg-[#fbf8f3] p-1">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${mode === 'login' ? 'bg-gold text-paper' : 'text-muted'}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${mode === 'register' ? 'bg-gold text-paper' : 'text-muted'}`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <label className="block">
                <span className="mb-2 block text-sm text-muted">Full name</span>
                <div className="field-shell">
                  <input
                    value={formData.name}
                    onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                    className="w-full border-none bg-transparent text-ink outline-none"
                    placeholder="Your full name"
                  />
                </div>
              </label>
            )}

            <label className="block">
              <span className="mb-2 block text-sm text-muted">Email</span>
              <div className="field-shell">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                  className="w-full border-none bg-transparent text-ink outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-muted">Password</span>
              <div className="field-shell">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
                  className="w-full border-none bg-transparent text-ink outline-none"
                  placeholder="Enter your password"
                />
              </div>
            </label>

            <button type="submit" disabled={isSubmitting} className="gold-button mt-2 w-full">
              {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4 text-sm text-muted">
            <div className="h-px flex-1 bg-line" />
            <span>or</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <a
            href={getGoogleAuthUrl()}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-line bg-white px-5 py-3 font-semibold text-ink transition hover:border-gold/35 hover:bg-[#fbf8f3]"
          >
            <span className="text-lg">G</span>
            Sign in with Google
          </a>

          <p className="mt-6 text-center text-sm text-muted">
            By continuing, you keep your chanting data private and protected.
          </p>

          <div className="mt-6 text-center text-sm text-muted">
            Need help later? Head back to <Link to="/" className="text-gold">your dashboard</Link> after sign in.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
