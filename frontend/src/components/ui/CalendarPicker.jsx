import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { isSameDay } from 'date-fns'

function CalendarPicker({ selectedDate, onChange, highlightedDates = [] }) {
  return (
    <div className="min-w-0 bg-white border rounded-3xl py-4">
      {/* 1. Added a more specific style block */}
      <style>{`
  /* 1. Remove the border and make the container full width */
  .react-calendar {
    border: none !important;
    background: transparent !important;
    width: 100% !important;
    max-width: 100% !important; /* This overrides the 350px default */
    font-family: inherit;
  }

  /* 2. Make the calendar tiles (days) stretch proportionally */
  .react-calendar__viewContainer,
  .react-calendar__month-view,
  .react-calendar__month-view > div,
  .react-calendar__month-view > div > div {
    width: 100% !important;
  }

  /* 3. Ensure day tiles grow to fill space */
  .react-calendar__tile {
    max-width: none !important;
    aspect-ratio: 1 / 1; /* Keeps them square as they stretch */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* 4. Navigation styling fix (optional, for better spacing) */
  .react-calendar__navigation {
    margin-bottom: 1rem;
    display: flex;
    height: 44px;
  }
`}</style>

      <Calendar
        value={selectedDate}
        onChange={onChange}
        maxDate={new Date()}
        next2Label={null}
        prev2Label={null}
        formatShortWeekday={(_, date) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]}
        tileContent={({ date, view }) => {
          if (view !== 'month') return null

          const hasEntry = highlightedDates.some((entryDate) => isSameDay(new Date(entryDate), date))
          if (!hasEntry) return null

          return <span className="absolute bottom-[7px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#f4b464]" />
        }}
      />
    </div>
  )
}

export default CalendarPicker