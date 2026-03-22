import { useState } from 'react'
import toast from 'react-hot-toast'
import { differenceInCalendarDays } from 'date-fns'
import { MANTRAS } from '../utils/constants'
import { toInputDate } from '../utils/formatters'
import { useChants } from '../hooks/useChants.js'
import Loader from '../components/ui/Loader.jsx'
import MantraTab from '../components/ui/MantraTab.jsx'
import CalendarPicker from '../components/ui/CalendarPicker.jsx'
import ChantInputCard from '../components/ui/ChantInputCard.jsx'

function AddChant() {
  const [selectedMantra, setSelectedMantra] = useState(MANTRAS[0].id)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [manualCount, setManualCount] = useState(null)
  const { chants, isLoading, isSaving, upsertChant } = useChants()

  const selectedMantraMeta = MANTRAS.find((mantra) => mantra.id === selectedMantra) || MANTRAS[0]
  const existingEntry = chants.find(
    (item) => item.mantraId === selectedMantra && toInputDate(item.date) === toInputDate(selectedDate),
  )
  const count = manualCount ?? (existingEntry ? existingEntry.count : '')
  const streakDates = [...new Set(
    chants
      .filter((item) => item.mantraId === selectedMantra && Number(item.count) > 0)
      .map((item) => toInputDate(item.date)),
  )]
    .map((value) => new Date(value))
    .sort((left, right) => right - left)

  const currentStreak = streakDates.reduce((total, currentDate, index) => {
    if (index === 0) {
      return 1
    }

    const previousDate = streakDates[index - 1]
    return differenceInCalendarDays(previousDate, currentDate) === 1 ? total + 1 : total
  }, 0)

  function updateCount(nextValue) {
    setManualCount((current) => {
      const base = Number(current ?? existingEntry?.count ?? 0) || 0
      return typeof nextValue === 'function' ? nextValue(base) : nextValue
    })
  }

  async function handleSave() {
    const parsedCount = Number(count)

    if (count === '' || !Number.isInteger(parsedCount) || parsedCount < 0) {
      toast.error('Chant count must be a non-negative whole number.')
      return
    }

    await upsertChant({
      mantraId: selectedMantra,
      date: toInputDate(selectedDate),
      count: parsedCount,
    })
  }

  if (isLoading) {
    return <Loader label="Loading your latest chant entries..." />
  }

  return (
    <section className="mx-auto max-w-6xl space-y-6">
      <div className="grid grid-cols-4 gap-2 lg:gap-3">
        {MANTRAS.map((mantra) => (
          <MantraTab
            key={mantra.id}
            mantra={mantra}
            isActive={selectedMantra === mantra.id}
            onSelect={(mantraId) => {
              setSelectedMantra(mantraId)
              setManualCount(null)
            }}
          />
        ))}
      </div>

      <div className="rounded-[28px] border border-[#eadfce] bg-[#fdf7ef] px-5 py-6 shadow-[0_12px_28px_rgba(97,74,42,0.05)] sm:px-7 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <CalendarPicker
            selectedDate={selectedDate}
            onChange={(date) => {
              setSelectedDate(date)
              setManualCount(null)
            }}
            highlightedDates={chants.map((item) => item.date)}
          />

          <div className="relative">
            {isSaving ? <Loader label="Saving chant count..." overlay /> : null}
            <ChantInputCard
              selectedDate={selectedDate}
              count={count}
              setCount={updateCount}
              onSave={handleSave}
              isSaving={isSaving}
              hasExistingEntry={Boolean(existingEntry)}
              mantra={selectedMantraMeta}
              currentStreak={currentStreak}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddChant
