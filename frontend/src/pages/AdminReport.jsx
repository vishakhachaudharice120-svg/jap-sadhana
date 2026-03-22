import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Download } from 'lucide-react'
import { useAuth } from '../context/useAuth.js'
import { downloadReport, fetchReportSummary } from '../services/report.service'
import { toInputDate } from '../utils/formatters'
import Loader from '../components/ui/Loader.jsx'
import { MANTRAS } from '../utils/constants'

function AdminReport() {
  const { user } = useAuth()
  const [isDownloading, setIsDownloading] = useState(false)
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)
  const [filters, setFilters] = useState({
    from: toInputDate(new Date()),
    to: toInputDate(new Date()),
  })
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totals: MANTRAS.reduce((acc, mantra) => {
      acc[mantra.id] = 0
      return acc
    }, {}),
  })

  useEffect(() => {
    let isActive = true

    async function loadSummary() {
      try {
        setIsLoadingSummary(true)
        const response = await fetchReportSummary()
        if (!isActive) {
          return
        }
        setSummary(response?.data || {
          totalUsers: 0,
          totals: {},
        })
      } catch (error) {
        if (isActive) {
          toast.error(error?.response?.data?.message || 'Unable to load report summary.')
        }
      } finally {
        if (isActive) {
          setIsLoadingSummary(false)
        }
      }
    }

    loadSummary()

    return () => {
      isActive = false
    }
  }, [])

  async function handleDownload() {
    if (filters.from && filters.to && filters.from > filters.to) {
      toast.error('The from date cannot be later than the to date.')
      return
    }

    try {
      setIsDownloading(true)
      const blob = await downloadReport({ format: 'excel', from: filters.from, to: filters.to })
      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a')
      link.href = url
      link.download = 'jap-report.xlsx'
      link.click()
      window.URL.revokeObjectURL(url)
      toast.success('Excel report downloaded.')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to download report.')
    } finally {
      setIsDownloading(false)
    }
  }

  if (user?.role !== 'admin') {
    return (
      <div className="glass-panel p-8">
        <p className="soft-label">Restricted</p>
        <h2 className="mt-2 text-3xl text-ink">This page is only available to admins.</h2>
      </div>
    )
  }

  return (
    <section className="space-y-5">
      <div className="glass-panel p-5">
        {isDownloading ? <Loader label="Preparing your report..." overlay /> : null}
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm text-muted">From</span>
            <div className="field-shell">
              <input
                type="date"
                value={filters.from}
                onChange={(event) => setFilters((current) => ({ ...current, from: event.target.value }))}
                className="w-full border-none bg-transparent text-ink outline-none"
              />
            </div>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-muted">To</span>
            <div className="field-shell">
              <input
                type="date"
                value={filters.to}
                onChange={(event) => setFilters((current) => ({ ...current, to: event.target.value }))}
                className="w-full border-none bg-transparent text-ink outline-none"
              />
            </div>
          </label>
        </div>

        <button type="button" onClick={handleDownload} disabled={isDownloading} className="gold-button mt-6">
          <Download size={16} className="mr-2" />
          {isDownloading ? 'Preparing report...' : 'Download Excel Report'}
        </button>
      </div>

      <div className="glass-panel p-5">
        {isLoadingSummary ? <Loader label="Loading summary..." overlay /> : null}
        <div className="mb-4">
          <p className="soft-label">Report details</p>
          <h3 className="mt-1 text-xl text-ink">All-time totals</h3>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
          <div className="rounded-[20px] border border-line bg-white p-4">
            <p className="text-sm text-muted">Total users</p>
            <p className="mt-2 text-3xl font-semibold text-ink">{summary.totalUsers || 0}</p>
          </div>

          {MANTRAS.map((mantra) => (
            <div key={mantra.id} className="rounded-[20px] border border-line bg-white p-4">
              <p className="text-sm text-muted">{mantra.label}</p>
              <p className="mt-2 text-3xl font-semibold text-ink">{summary.totals?.[mantra.id] || 0}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdminReport
