import { useState } from 'react'
import { ArrowUpDown, BarChart3, LineChart, Table2 } from 'lucide-react'
import { MANTRAS } from '../utils/constants'
import { formatCount, getMantraMeta } from '../utils/formatters'
import { useAnalytics } from '../hooks/useAnalytics.js'
import Loader from '../components/ui/Loader.jsx'
import MantraTab from '../components/ui/MantraTab.jsx'
import LineChartView from '../components/charts/LineChartView.jsx'
import BarChartView from '../components/charts/BarChartView.jsx'

function Analytics() {
  const today = new Date()
  const [selectedMantra, setSelectedMantra] = useState(MANTRAS[0].id)
  const [activeTab, setActiveTab] = useState('graph')
  const [chartType, setChartType] = useState('line')
  const [sortDirection, setSortDirection] = useState('desc')
  const [page, setPage] = useState(1)
  const { summary, monthlyData, isLoading } = useAnalytics(selectedMantra, today.getMonth() + 1, today.getFullYear())

  const selectedMeta = getMantraMeta(selectedMantra)
  const sortedData = [...monthlyData].sort((a, b) => (sortDirection === 'desc' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)))
  const paginatedData = sortedData.slice((page - 1) * 10, page * 10)
  const totalPages = Math.max(1, Math.ceil(sortedData.length / 10))

  if (isLoading) {
    return <Loader label="Building your analytics view..." />
  }

  return (
    <section className="space-y-5">
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
        {MANTRAS.map((mantra) => (
          <MantraTab
            key={mantra.id}
            mantra={mantra}
            isActive={selectedMantra === mantra.id}
            suffix={formatCount(summary[mantra.id] || 0)}
            onSelect={(value) => {
              setSelectedMantra(value)
              setPage(1)
            }}
          />
        ))}
      </div>

      <div className="glass-panel p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="soft-label">Analytics workspace</p>
            <h3 className="mt-1 text-lg text-ink">{selectedMeta.label}</h3>
            <p className="mt-1 text-sm text-muted hidden md:block">Choose either the graph view or the table view for this mantra.</p>
          </div>

          <div className="flex gap-2 rounded-full border border-line bg-[#fbf8f3] p-1">
            <button
              type="button"
              onClick={() => setActiveTab('graph')}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === 'graph' ? 'bg-gold text-paper' : 'text-muted'
              }`}
            >
              <BarChart3 size={16} />
              Graph
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === 'table' ? 'bg-gold text-paper' : 'text-muted'
              }`}
            >
              <Table2 size={16} />
              Table
            </button>
          </div>
        </div>

        {activeTab === 'graph' ? (
          <div className="mt-6">
            <div className="mb-4 flex w-fit gap-2 rounded-full border border-line bg-[#fbf8f3] p-1">
              <button
                type="button"
                onClick={() => setChartType('line')}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  chartType === 'line' ? 'bg-gold text-paper' : 'text-muted'
                }`}
              >
                <LineChart size={16} />
                Line
              </button>
              <button
                type="button"
                onClick={() => setChartType('bar')}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  chartType === 'bar' ? 'bg-gold text-paper' : 'text-muted'
                }`}
              >
                <BarChart3 size={16} />
                Bar
              </button>
            </div>

            {chartType === 'line' ? (
              <LineChartView data={monthlyData} color={selectedMeta.color} />
            ) : (
              <BarChartView data={monthlyData} color={selectedMeta.color} />
            )}
          </div>
        ) : (
          <div className="mt-6">
            <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="soft-label">Table view</p>
                <h4 className="mt-1 text-base text-ink">{selectedMeta.label} entries</h4>
              </div>
              <button
                type="button"
                onClick={() => setSortDirection((current) => (current === 'desc' ? 'asc' : 'desc'))}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-[#fbf8f3] px-4 py-3 text-sm text-muted"
              >
                <ArrowUpDown size={16} />
                Sort by date: {sortDirection === 'desc' ? 'Newest' : 'Oldest'}
              </button>
            </div>

            <div className="overflow-hidden rounded-[20px] border border-line">
              <table className="min-w-full divide-y divide-line text-left">
                <thead className="bg-[#fbf8f3] text-sm text-muted">
                  <tr>
                    <th className="px-5 py-4 font-medium">Date</th>
                    <th className="px-5 py-4 font-medium">Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {paginatedData.length ? (
                    paginatedData.map((entry) => (
                      <tr key={`${entry.date}-${entry.count}`} className="bg-transparent text-ink">
                        <td className="px-5 py-4">{entry.date}</td>
                        <td className="px-5 py-4">{formatCount(entry.count)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="px-5 py-10 text-center text-muted">
                        No analytics entries found for this month yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex items-center justify-between text-sm text-muted">
              <p>Page {page} of {totalPages}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page === 1}
                  className="rounded-full border border-line bg-white px-4 py-2 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={page === totalPages}
                  className="rounded-full border border-line bg-white px-4 py-2 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Analytics
