import { Component } from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('Frontend error boundary caught an error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-ink px-6">
          <div className="glass-panel max-w-xl p-8 text-center">
            <p className="soft-label">Unexpected error</p>
            <h2 className="mt-3 text-3xl text-paper">Something slipped during the chant flow.</h2>
            <p className="mt-4 text-paper/60">Refresh the app or head back to the main page to continue.</p>
            <Link to="/chants" className="gold-button mt-8">Go to dashboard</Link>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
