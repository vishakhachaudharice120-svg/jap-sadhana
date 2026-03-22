import { Minus, Plus } from 'lucide-react'
import { formatDisplayDate } from '../../utils/formatters'

function ChantInputCard({ selectedDate, count, setCount, onSave, isSaving, hasExistingEntry, mantra, currentStreak }) {
  return (
    <div className="min-w-0 bg-white h-full border rounded-3xl px-5 py-20 pt-10">
      <h3 className="font-heading text-[22px] font-semibold leading-tight text-[#111827] sm:text-[24px]">
        {formatDisplayDate(selectedDate, 'EEEE, d MMM yyyy')}
      </h3>

      <div className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full bg-[#fff4e8] px-4 py-2 text-sm text-[#f08a06]">
        <span className="truncate">{mantra.label}</span>
      </div>

      <div className="mt-8 rounded-[20px] border border-transparent bg-transparent">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d1d3d8]">Jap count</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setCount((current) => Math.max(0, current - 1))}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] border border-[#cfc7bc] bg-white text-[#111827]"
            aria-label="Decrease jap count"
          >
            <Minus size={18} />
          </button>

          <div className="min-w-0 flex-1 text-center">
            <input
              type="number"
              min="0"
              value={count}
              onChange={(event) => {
                const nextValue = event.target.value
                if (nextValue === '') {
                  setCount('')
                  return
                }
                setCount(Math.max(0, Number(nextValue)))
              }}
              className="w-full border py-2 px-1 rounded-md bg-transparent text-center text-xs md:text-base break-words leading-none text-[#111827] outline-none whitespace-normal"
              placeholder="Enter jap count eg. 108"
              aria-label="Jap count"
            />
          </div>

          <button
            type="button"
            onClick={() => setCount((current) => current + 1)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] border border-[#cfc7bc] bg-white text-[#111827]"
            aria-label="Increase jap count"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <div className="mt-6 border-t border-[#ebe5dc] pt-4 text-[15px] text-[#aea6a0]">
        Streak <span className="ml-1 font-semibold text-[#f08a06]">{currentStreak} days</span>{' '}
        <span aria-hidden="true">{'\u{1F525}'}</span>
      </div>

      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className="mt-8 flex h-11 w-full items-center justify-center rounded-[12px] border border-[#c9c1b7] bg-white text-[18px] font-medium text-[#111827] transition hover:border-[#a79b8d] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? 'Saving...' : hasExistingEntry ? 'Update jap count' : 'Save jap count'}
      </button>
    </div>
  )
}

export default ChantInputCard
