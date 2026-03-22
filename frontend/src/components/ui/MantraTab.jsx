function MantraTab({ mantra, isActive, onSelect, suffix = '' }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(mantra.id)}
      className={`inline-flex min-w-0 w-full items-center justify-center overflow-hidden rounded-2xl border !px-2 py-2 text-[10px] leading-[1.15] transition sm:rounded-full sm:px-5 sm:py-3 sm:text-sm ${
        isActive ? 'border-[#f0ba7b] bg-[#fff8ef] text-[#f08a06]' : 'border-[#ece5da] bg-white text-[#7b6f65] hover:border-[#dfd6c8]'
      }`}
    >
      <span className="w-full text-center break-words whitespace-normal">
        {mantra.label}
        {suffix ? <span className="ml-1 text-muted">({suffix})</span> : null}
      </span>
    </button>
  )
}

export default MantraTab
