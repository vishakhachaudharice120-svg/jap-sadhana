import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="glass-panel flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="soft-label">404</p>
      <h2 className="mt-3 text-4xl text-paper">This path has drifted out of the mandala.</h2>
      <p className="mt-4 max-w-lg text-paper/60">The page you were looking for does not exist, but your dashboard is still right where you left it.</p>
      <Link to="/chants" className="gold-button mt-8">Return to dashboard</Link>
    </div>
  )
}

export default NotFound

