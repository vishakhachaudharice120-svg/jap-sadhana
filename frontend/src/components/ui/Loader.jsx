function Loader({ label = 'Loading...', fullScreen = false, overlay = false }) {
  const shellClass = fullScreen
    ? 'flex min-h-screen items-center justify-center bg-mist'
    : overlay
      ? 'absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-white/75 backdrop-blur-[2px]'
      : 'flex min-h-[220px] items-center justify-center'

  return (
    <div className={shellClass}>
      <div className="glass-panel flex items-center gap-4 px-6 py-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold/25 border-t-gold" />
        <p className="text-sm text-muted">{label}</p>
      </div>
    </div>
  )
}

export default Loader
